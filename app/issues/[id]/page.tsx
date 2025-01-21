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
  // if(typeof params.id !== 'number') notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
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
