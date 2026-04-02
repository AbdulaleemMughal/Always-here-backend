import express from "express";
import { getFamilyTree, updateFamilyTree } from "../controller/familyTree.controller";

const familyTreeRouter = express.Router();

familyTreeRouter.get("/get-familyTree/:memorialId", getFamilyTree);
familyTreeRouter.patch("/update-familyTree/:memorialId", updateFamilyTree);

export default familyTreeRouter;
