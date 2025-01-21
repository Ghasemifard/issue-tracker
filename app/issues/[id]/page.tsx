import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import delay from "delay";
import { Card, Flex, Heading,Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from 'react-markdown'
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // Asynchronously unwrap params
  const { id } = await params;
  // Parse and validate id
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) {
    notFound(); // Redirect to 404 if id is invalid
  }
    
  // Fetch the issue from the database
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) notFound(); //Redirect to 404 if no issue is found
  // Optional delay for demonstration purposes
  await delay(2000);

  return (
    <div>
      <Heading >{issue.title}</Heading>
      <Flex my="2" gap="3">
      <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>

      <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
