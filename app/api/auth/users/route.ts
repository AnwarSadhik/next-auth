import startDb from "@/libs/db";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}
interface NewUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest;

  await startDb();
  const userExists = await userModel.findOne({ email: body.email });
  if (userExists) {
    return NextResponse.json(
      { error: "email already in use" },
      { status: 422 }
    );
  }

  const user = await userModel.create({ ...body });
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  },{ status: 201 });
};
