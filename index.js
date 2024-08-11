const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('db_koperasi', 'postgres', 'domon', {
    host: 'localhost',
    dialect: 'postgres'
});

const app = express();
app.use(express.json());

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Tandai kolom ini sebagai kunci utama
        autoIncrement: true, // Jika kolom ini adalah auto-increment
        field: 'id_user' // Nama kolom di tabel
    },
    nama: DataTypes.STRING,
    nomer_rek: DataTypes.STRING
}, {
    tableName: 'tb_user',
    timestamps: false
});

// API endpoint untuk mendapatkan semua user
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API endpoint untuk menambahkan user
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
