import express from 'express';
import { createCate, deleteCate, detailCate, listCate, updateCate } from '../controller/categories';
import { checkPermission } from '../midd/checkPremission';
const routerCate = express.Router();

routerCate.post('/', checkPermission, createCate);
routerCate.get('/', listCate);
routerCate.get('/:id', detailCate);
routerCate.put('/:id', updateCate);
routerCate.delete('/:id', checkPermission, deleteCate);

export default routerCate;