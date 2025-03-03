import { PostType } from "@shatrd/types/common";
import { fakeUser } from "./user-fake";

export const fakePost = {
  id: "8779747f-8874-44b1-864b-aa60e9f8d593",
  media: `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`,
  caption: "Bla bla bla",
  author: fakeUser,
  likeCount: 23,
  favoriteCount: 35,
  postType: PostType.Image,
  createdAt: "2024-08-13 16:21:33.049+00",
};
