import mongoose from "mongoose";

export type FamilyTreeType = {
  memorialId?: mongoose.Types.ObjectId;
  heading?: string;
  isActive?: boolean;
  treeData?: TreeDataType;
};

export type TreeDataType = {
  children: BranchType[] | [];
  f_grandFather: BranchType | null;
  f_grandMother: BranchType | null;
  father: BranchType | null;
  siblings: BranchType[] | [];
  m_grandFather: BranchType | null;
  m_grandMother: BranchType | null;
  mother: BranchType | null;
  wifes: BranchType[] | [];
};

export type BranchType = {
  name: string;
  img: string;
};
