import User from '../models/user.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from '../utils/generateToken.js'

// Signup
const signup = async (req, res) => {
  const { username, password } = req.body

  try {
    // Validate fields
    if(!username || !password) {
      return res.status(400).json({ error: 'All fields must be filled' })
    }

    if(!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password is too weak' })
    }

    // Check user existance
    const usernameExists = await User.findOne({username})
    if(usernameExists) {
      return res.status(400).json({error: 'Username already exist'})
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    // Create user
    const user = new User({
      username,
      password: hash,
    })
   
    // Create JWT token 
    if(user) {
      const token = generateTokenAndSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        token, // ✅ send token explicitly for mobile client
      });
    }
  }
  catch (error) {
    res.status(500).json({error: error.message})
    console.log('Error in signup controller', error.message)
  }
}

// Login
const login = async (req, res) => {
  const { username, password } = req.body

  try {
    // validation
    if(!username || !password) {
      return res.status(400).json({ error: 'All fields must be filled' })
    }

    const user = await User.findOne({username})

    if(!user) {
      return res.status(400).json({error: 'Incorrect username'})
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
      return res.status(400).json({error: 'Incorrect password'})
    }

    generateTokenAndSetCookie(user._id, res)
    res.status(200).json(user)
  } 
  catch (error) {
    res.status(500).json({error: error.message})
    console.log('Error in login controller', error.message)
  }
}

// Logout 
const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {maxAge: 0})
    res.status(200).json({message: 'Logout successful'})  
  } 
  catch (error) {
    res.status(500).json({error: error.message})
    console.log('Error in logout controller', error.message)
  }
}

export { signup, login, logout }