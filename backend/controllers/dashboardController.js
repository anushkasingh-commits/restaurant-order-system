const Order = require("../models/Order");

const roundMoney = (value) => {
  return Math.round(value * 100) / 100;
};
const getDashboard = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const orders = await Order.find({
      createdAt: { $gte: startOfToday },
      status: { $ne: "cancelled" },
    }).populate("items.menuItem", "category");
    let revenueToday = 0;
    const itemCounts = {};
    const categorySales = {};
    for (const order of orders) {
      if (order.status === "paid") {
        revenueToday = revenueToday + order.grandTotal;
      }
      for (const item of order.items) {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = 0;
        }
        itemCounts[item.name] = itemCounts[item.name] + item.quantity;
        let category = "unknown";
        if (item.menuItem && item.menuItem.category) {
          category = item.menuItem.category;
        }
        if (!categorySales[category]) {
          categorySales[category] = 0;
        }
        categorySales[category] = categorySales[category] + item.price * item.quantity;
      }
    }
    const topItems = Object.entries(itemCounts)
      .map(([name, quantity]) => ({ name: name, quantity: quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    for (const category in categorySales) {
      categorySales[category] = roundMoney(categorySales[category]);
    }
    res.status(200).json({
      date: startOfToday,
      ordersToday: orders.length,
      revenueToday: roundMoney(revenueToday),
      topItems: topItems,
      categorySales: categorySales,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };