import { NextFunction, Request, Response } from 'express';
import { Good } from '../models/good.model';

const getAllGoodsPagination = async(
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = (page - 1) * limit;

    const data = await Good.find().skip(offset).limit(limit).exec();
    const totalItems = await Good.countDocuments({});
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      page,
      per_page: limit,
      totalItems,
      totalPages,
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

const fullTextSearchGoods = async(
  req: Request,
  res: Response,
) => {
  try {
    const searchString = req.query.search as string;
    const searchResult = await Good.find({ 
      $text: {
        $search: searchString,
      }
    }).limit(10);
    
    res.status(200).json({
      data: searchResult,
    })
  } catch (error) {
    console.error(error);
  }
};


const getAllGoods = async(
  req: Request,
  res: Response,
) => {
  try {
    const goods = await Good.find();

    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     goods,
    //   }
    // })
    res.status(201).json(goods);
  } catch (err) {
    console.error(err);
  }
};

const getOneGoodById = async(
  req: Request,
  res: Response,
) => {
  try {
    const good = await Good.findById(req.params.goodId);

    if (!good) {
      console.error('Good with that ID not found', 404);
    }

    res.status(200).json(good)
  } catch (error) {
    
  }
}

const addNewGood = async(
  req: Request,
  res: Response,
) => {
  try {
    const { category, name, poster, price } = req.body;
    const newGood = new Good({
      category,
      name,
      poster,
      price,
    });
    await newGood.save();

    const goods = await Good.find();
    res.status(201).json(goods);
  } catch (error) {
    console.error(error);
  }
}

const deleteOneGood = async(
  req: Request,
  res: Response,
) => {
  try {
    const good = await Good.findOneAndDelete({ _id: req.params.goodId });

    if (!good) {
      console.error('Post with that ID not found');
    }

    res.status(200).json(null);
  } catch (error) {
    console.error(error);
  }
}

export { 
  getAllGoodsPagination,
  fullTextSearchGoods,
  getAllGoods,
  getOneGoodById,
  addNewGood,
  deleteOneGood,
};