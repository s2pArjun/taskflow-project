require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db');

// Import models so Sequelize registers them and creates associations
require('./src/models/user.model');
require('./src/models/task.model');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // alter: true updates columns without dropping tables (safe for dev)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📄 Swagger docs at http://localhost:${PORT}/api/v1/docs`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
