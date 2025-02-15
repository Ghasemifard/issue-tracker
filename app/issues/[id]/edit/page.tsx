import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
type Props = {
  params: Promise<{ id: string }>;
};

const EditIssuePage = async ({ params }: Props) => {
  const resolvedParams = await params; // Resolve the promise
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) }, // Use resolved params
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
