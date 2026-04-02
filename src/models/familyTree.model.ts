import mongoose, { Schema } from "mongoose";
import { FamilyTreeType } from "../@types/familyTree.type";

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
      children: [
        {
          name: {
            type: String,
            default: "Full Name",
          },
          img: {
            type: String,
            default:
              "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
          },
        },
      ],
      f_grandFather: {
        name: {
          type: String,
          default: "Full Name",
        },
        img: {
          type: String,
          default:
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
        },
      },
      f_grandMother: {
        name: {
          type: String,
          default: "Full Name",
        },
        img: {
          type: String,
          default:
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
        },
      },
      father: {
        name: {
          type: String,
          default: "Full Name",
        },
        img: {
          type: String,
          default:
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
        },
      },
      siblings: [
        {
          name: {
            type: String,
            default: "Full Name",
          },
          img: {
            type: String,
            default:
              "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
          },
        },
      ],
      m_grandFather: {
        name: {
          type: String,
          default: "Full Name",
        },
        img: {
          type: String,
          default:
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
        },
      },
      m_grandMother: {
        name: {
          type: String,
          default: "Full Name",
        },
        img: {
          type: String,
          default:
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
        },
      },
      mother: {
        name: {
          type: String,
          default: "Full Name",
        },
        img: {
          type: String,
          default:
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
        },
      },
      wifes: [
        {
          name: {
            type: String,
            default: "Full Name",
          },
          img: {
            type: String,
            default:
              "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
          },
        },
      ],
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
