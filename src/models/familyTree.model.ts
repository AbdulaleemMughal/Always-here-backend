import mongoose, { Schema } from "mongoose";
import { BranchType, FamilyTreeType } from "../@types/familyTree.type";

const PersonSchema = new Schema<BranchType>({
  name: {
    type: String,
    default: "Full Name",
  },
  img: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
  },
});

const FamilyTreeSchema = new Schema<FamilyTreeType>(
  {
    memorialId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    heading: {
      type: String,
      default: "Family Tree",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    treeData: {
      children: [PersonSchema],
      f_grandFather: {
        type: PersonSchema,
        default: null,
        required: false,
      },
      f_grandMother: {
        type: PersonSchema,
        default: null,
        required: false,
      },
      father: {
        type: PersonSchema,
        default: null,
        required: false,
      },
      siblings: [PersonSchema],
      m_grandFather: {
        type: PersonSchema,
        default: null,
        required: false,
      },
      m_grandMother: {
        type: PersonSchema,
        default: null,
        required: false,
      },
      mother: {
        type: PersonSchema,
        default: null,
        required: false,
      },
      wifes: [PersonSchema],
    },
  },
  {
    timestamps: true,
  },
);

const FamilyTree = mongoose.model<FamilyTreeType>(
  "FamilyTree",
  FamilyTreeSchema,
);

export default FamilyTree;
