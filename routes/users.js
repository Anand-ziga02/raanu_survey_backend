const express = require('express');
const {Router}=require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const user_router=Router()
user_router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); 
    res.status(200).json({ message: 'creating user' });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

user_router.post('/', async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body,"req.body======================")
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(200).json({ message: 'creating user' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

module.exports=user_router