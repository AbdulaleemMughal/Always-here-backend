import mongoose from "mongoose";

export type FamilyTreeType = {
    memorialId: mongoose.Types.ObjectId;
  children: [BranchType];
  f_grandFather: BranchType;
  f_grandMother: BranchType;
  father: BranchType;
  siblings: [BranchType];
  m_grandFather: BranchType;
  m_grandMother: BranchType;
  mother: BranchType;
  wifes: [BranchType];
};

export type BranchType = {
  name: string;
  image: string;
};
