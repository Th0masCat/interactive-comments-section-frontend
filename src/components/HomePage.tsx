import {
  AppShell,
  Flex,
  Text,
  Skeleton,
  Image,
  Header,
  Avatar,
  Button,
  Popover,
  Box,
  Grid
} from "@mantine/core";

import CommentBoxComponent from "./CommentBoxComponent";
import ReplyBoxComponent from "./ReplyBoxComponent";
import SkeletonComponent from "./SkeletonComponent";
import LoginModal from "./LoginModal";

import useUser from "../helpers/useUser";
import { endpoint } from "../helpers/useUser";

import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { useState } from "react";

export default function HomePage() {
  const user = useRecoilValue(userState)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  const { comments, isLoading } = useUser('/api/toka')

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  }

  const handleLogout = () => {
    window.location.reload();
  };

  function Tree(node: any, depth: any) {
    return (
      <>
        <Box
          key={node.data.id}
        sx={{
          borderLeft: `1px dotted ${depth !== 0 ? "lightgrey" : "transparent"}`,
          borderBottom: `1px dotted ${depth !== 0 ? "lightgrey" : "transparent"}`,
          paddingLeft: depth !== 0 ? "0.3rem" : "0",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          paddingTop: "2rem",
          marginLeft: 10 * depth
        }}>
          <CommentBoxComponent
            renderLine={depth !== 0}
            key={node.data.id}
            loggedInUser={user.isLoggedin}
            id={node.data.id}
            img={endpoint + node.data.user_details.user_image}
            like={node.data.likes}
            name={node.data.user_details.name}
            time={node.data.time_when_posted}
            content={node.data.post_content}
          />
          {
            node.children.map((child: any) => (
              Tree(child, depth + 1)
            ))
          }
        </Box>
      </>
    );
  }

  function renderForest(forest: any) {
    return forest.map((tree: any) => Tree(tree, 0));
  }

  return (
    <AppShell
      sx={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}

      header={
        <Header
          height={60}
          display={'flex'}
          p={'sm'}
        >
          {
            user.isLoggedin ?
              <Flex
                align="center"
                justify="space-between"
                w="100%"
              >
                <Text
                  size="xl"
                  weight={700}
                  color='siteNeutral.1'
                >
                  Toka
                </Text>
                <Flex
                  align="center"
                  justify="space-between"
                  gap={"xs"}
                >
                  <Text
                    size="sm"
                    weight={700}
                    color='siteNeutral.1'
                  >
                    Welcome, {user.name}
                  </Text>

                  <Popover
                    position="bottom"
                    withArrow>
                    <Popover.Target>
                      <Avatar
                        radius="xl"
                        src={endpoint + user.user_image}
                        alt="profile_img" />
                    </Popover.Target>

                    <Popover.Dropdown>
                      <Button
                        sx={(theme) => ({
                          root: {
                            backgroundColor: 'transparent',
                            color: theme.colors.sitePrimary[1],
                            '&:hover': {
                              backgroundColor: 'transparent',
                            }
                          }
                        })
                        }
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Popover.Dropdown>
                  </Popover>
                </Flex>
              </Flex>
              :
              <Flex
                align="center"
                justify="space-between"
                w="100%">
                <Text
                  size="xl"
                  weight={700}
                  color='siteNeutral.1'
                >
                  Toka
                </Text>
                <Avatar
                  onClick={handleLoginClick}
                  radius="xl"
                  alt="profile_img" />
                <LoginModal
                  open={isLoginModalOpen}
                  onClose={() => setIsLoginModalOpen(false)}
                />
              </Flex>
          }
        </Header>
      }
    >
      <Grid
        w={'100%'}
        sx={(theme) => ({
          root: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >

        <Grid.Col
          offset={2}
          span={8}
        >
          <Flex
            direction={"column"}
          >
            <Text
              size="xl"
              weight={700}
              color='siteNeutral.1'
            >
              Hotdogs are real???
            </Text>
            <Text
              size="xs"
              weight={400}
              color='siteNeutral.1'
              mb={'lg'}
            >
              Posted by rex2187
            </Text>

            <Image
              src="https://i.giphy.com/media/5E7vDOIamcWlzg97TG/giphy.webp"
              radius={'lg'}
              height={500}
              mb={"xl"}
            />
            <Skeleton
              height={8}
              animate={false}
              radius="xl" />
            <Skeleton
              height={8}
              animate={false}
              mt={6}
              radius="xl"
            />
            <Skeleton
              height={8}
              animate={false}
              mt={6}
              width="70%"
              radius="xl"
            />
          </Flex>
          <Text
            size="lg"
            weight={700}
            color='siteNeutral.0'
            mt={'xl'}
            mb={'lg'}
          >
            Comments:
          </Text>
          <ReplyBoxComponent closeModal={null} parent_id={null} />

          {
            isLoading ?
              <>
                <SkeletonComponent />
                <SkeletonComponent />
                <SkeletonComponent />
              </>
              :
              <>

                {
                  comments ?
                    renderForest(comments)
                    :
                    <Text
                      size="lg"
                      weight={700}
                      color='siteNeutral.0'
                    >
                      No Comments Yet
                    </Text>
                }

              </>
          }
        </Grid.Col >
      </Grid>
    </AppShell>
  );
}
