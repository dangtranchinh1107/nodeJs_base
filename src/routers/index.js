import express from 'express';
import routerPro from './routerPro';
import routerAuth from './users';
import routerCate from './categories';
const router = express.Router();

router.use('/products', routerPro);
router.use('/auth', routerAuth);
router.use('/categories', routerCate);

export default router;