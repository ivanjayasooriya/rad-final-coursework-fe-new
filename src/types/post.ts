export interface PostAuthor {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
}

export interface PetPost {
  _id: string;
  status: "LOST" | "FOUND";
  petName: string;
  breed: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  reward?: string;
  contactPhone: string[] | string;
  contactEmail: string[] | string;
  imageURL?: string;
  bookmark?: string[];
}

// Shape returned by admin endpoints, which populate the submitting author.
export interface AdminPetPost extends PetPost {
  author: PostAuthor;
}
