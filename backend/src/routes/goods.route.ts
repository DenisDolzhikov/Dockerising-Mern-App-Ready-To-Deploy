import express from 'express';
import { addNewGood, deleteOneGood, fullTextSearchGoods, getAllGoods, getAllGoodsPagination, getOneGoodById } from '../controllers/good.controller';

const router = express.Router();

router.get('/', getAllGoodsPagination);
router.get('/search', fullTextSearchGoods);
router.get('/:goodId', getOneGoodById);
router.post('/add', addNewGood);
router.delete('/:goodId', deleteOneGood);

// router
//   .route('/')
//   .get(
//     getAllGoods
//   );

// router
//   .route('/add')
//   .post(
//     addNewGood,
//   )

// router
//   .route('/:goodId')
//   .get(
//     getOneGood,
//   )
//   .delete(
//     deleteOneGood,
//   )

export default router;