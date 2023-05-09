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
  Box
} from "@mantine/core";

import CommentBoxComponent from "./CommentBoxComponent";
import ReplyBoxComponent from "./ReplyBoxComponent";
import SkeletonComponent from "./SkeletonComponent";
import LoginModal from "./LoginModal";

import useUser from "../helpers/useUser";
import { endpoint } from "../helpers/useUser";

import avatar from '../../images/avatars/image-amyrobson.png'

import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from "react";

function buildForest(data: { [key: number]: number[] }) {
  const nodes: { [key: number]: any } = {};
  const roots: any = [];

  for (const key of Object.keys(data)) {
    const value = parseInt(key, 10);
    nodes[value] = { value, children: [] };
  }

  for (const [key, children] of Object.entries(data)) {
    const node = nodes[parseInt(key, 10)];
    node.children = children.map(child => nodes[child]);

    if (!Object.values(data).flat().includes(node.value)) {
      roots.push(node);
    }
  }

  return roots;
}




export default function HomePage() {
  const user = useRecoilValue(userState)

  const [dataDictionary, setDataDictionary] = useState({} as any)
  const [commentTree, setCommentTree] = useState({} as any)
  const [forest, setForest] = useState([] as any)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  }

  const handleLogout = () => {
    window.location.reload();
  };

  const [comment, setComment] = useState([] as any)

  const { comments, mutate, isLoading } = useUser(endpoint + '/api/toka')

  useEffect(() => {
    if (comments != null) {
      setComment(comments);
    }
  }, [comments]);

  useEffect(() => {
    comment.map((item: any) => {
      setDataDictionary((prevState: any) => (
        {
          ...prevState,
          [item.id]: item
        }))

      setCommentTree((prevState: any) => ({
        ...prevState,
        [item.id]: []
      }))

      if (item.parent_post) {
        setCommentTree((prevState: any) => (
          {
            ...prevState,
            [item.parent_post]: [...prevState[item.parent_post], item.id]
          }))
      }
    })
  }, [comment]);

  useEffect(() => {
    if (Object.keys(dataDictionary).length > 0) {
      setForest(buildForest(commentTree))
      console.log(forest)
    }

  }, [dataDictionary, commentTree]);

  function Tree(node: any, depth: any) {
    return (
      <>
        <CommentBoxComponent
          key={dataDictionary[node.value].id * 2}
          marginLeft={`${2 * depth}rem`}
          loggedInUser={user.isLoggedin}
          id={dataDictionary[node.value].id}

          img={endpoint + dataDictionary[node.value].user_details.user_image}
          like={dataDictionary[node.value].likes}
          name={dataDictionary[node.value].user_details.name}
          time={dataDictionary[node.value].time_when_posted}
          content={dataDictionary[node.value].post_content}
        />
        {
          node.children.map((child: any) => (
            Tree(child, depth + 1)
          ))
        }
      </>
    );
  }

  function renderForest(forest: any) {
    return forest.map((tree: any) => Tree(tree, 0));
  }


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
                        styles={(theme) => ({
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
      <Flex
        direction="column"
        align="center"
        gap={'md'}>
        <Flex
          direction={"column"}
          w={'50rem'}>
          <Text
            size="xl"
            weight={700}
            w={'50rem'}
            color='siteNeutral.1'
          >
            Hotdogs are real???
          </Text>
          <Text
            size="xs"
            weight={400}
            w={'50rem'}
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
          w={'50rem'}
          color='siteNeutral.0'
        >
          Comments:
        </Text>

        <CommentBoxComponent
          img={avatar}
          like={3}
          time='2023-04-22T06:23:14.333479Z'
          name='amyrobson'
          content='Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ad sapiente tempora quae voluptates impedit id maiores suscipit. 
                    Consequuntur cupiditate voluptate enim! Quasi, veniam voluptas? Temporibus, perspiciatis. 
                    Tempora adipisci voluptatem ipsam.' />

        {
          isLoading ?
            <>
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
            </>
            :
            <>
              {renderForest(forest)}
            </>
        }
        {user.isLoggedin && <ReplyBoxComponent />}

      </Flex >
    </AppShell>
  );
}
