import { AppShell, Flex } from "@mantine/core";
import CommentBoxComponent from "./CommentBoxComponent";
import ReplyBoxComponent from "./ReplyBoxComponent";

export default function HomePage() {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Flex direction="column" align="center" gap={'md'}>
        <CommentBoxComponent />
        <ReplyBoxComponent />
      </Flex>
    </AppShell>
  );
}
