import User from '../models/User.js';
import { Request, Response } from 'express';

  // gets all users
  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // gets a single user
  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        res.status(404).json({ message: 'No user found' });
      } else {
        res.json(user);
      }
    } catch (err: any) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // updates a single user
  export const updateUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }

      return res.json(user)
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // deletes a single user
  export const deleteUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
      }

      const friend = await User.findOneAndUpdate(
          { users: req.params.userId },
          { $pull: { users: req.params.userId } },
          { new: true }
      );

      if (!friend) {
          return res.status(404).json({
              message: 'User deleted, but no friends found',
          });
      }

      return res.json({ message: 'User successfully deleted' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // creates a friends
  export const addFriend = async(req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if(!user) {
        return res.status(404).json({ message: 'no user' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // deletes a friend
  export const removeFriend = async(req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
      );

      if (!user) {
          return res
              .status(404)
              .json({ message: 'No user found' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }