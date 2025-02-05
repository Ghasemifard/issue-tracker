import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  requst: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await requst.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if(!issue)
    return NextResponse.json({error:"Inavalid issue"}, {status:404});
const updatedIssue = await prisma.issue.update({
    where: {id: issue.id},
    data:{
        title: body.title,
        description: body.description,
    }
});
return NextResponse.json(updatedIssue);
}
