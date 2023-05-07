import { AppShell, Flex, Text, Skeleton, Image, Header, Avatar, Button, Popover } from "@mantine/core";

import CommentBoxComponent from "./CommentBoxComponent";
import ReplyBoxComponent from "./ReplyBoxComponent";
import SkeletonComponent from "./SkeletonComponent";
import LoginModal from "./LoginModal";

import useUser from "../helpers/useUser";
import { endpoint } from "../helpers/useUser";

import avatar from '../../images/avatars/image-amyrobson.png'

import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { useState } from "react";

export default function HomePage() {
  const { comments, isLoading } = useUser(endpoint + '/api/toka')
  const user = useRecoilValue(userState)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  }

  const handleLogout = () => {
    window.location.reload();
  };

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
        <Header height={60} display={'flex'} p={'sm'}>
          {
            user.isLoggedin ?
              <Flex align="center" justify="space-between" w="100%">
                <Text size="xl" weight={700} color='siteNeutral.1'>Toka</Text>
                <Flex align="center" justify="space-between" gap={"xs"}>
                  <Text size="sm" weight={700} color='siteNeutral.1'>Welcome, {user.name}</Text>

                  <Popover position="bottom" withArrow>
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
              <Flex align="center" justify="space-between" w="100%">
                <Text size="xl" weight={700} color='siteNeutral.1'>Toka</Text>
                <Avatar
                  onClick={handleLoginClick}
                  radius="xl"
                  alt="profile_img" />
                <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
              </Flex>

          }

        </Header>

      }
    >
      <Flex direction="column" align="center" gap={'md'}>
        <Flex direction={"column"} w={'50rem'}>

          <Text size="xl" weight={700} w={'50rem'} color='siteNeutral.1'>Hotdogs are real???</Text>
          <Text size="xs" weight={400} w={'50rem'} color='siteNeutral.1' mb={'lg'}>Posted by rex2187</Text>

          <Image src="https://i.giphy.com/media/5E7vDOIamcWlzg97TG/giphy.webp" radius={'lg'} height={500} mb={"xl"} />
          <Skeleton height={8} animate={false} radius="xl" />
          <Skeleton height={8} animate={false} mt={6} radius="xl" />
          <Skeleton height={8} animate={false} mt={6} width="70%" radius="xl" />

        </Flex>
        <Text size="lg" weight={700} w={'50rem'} color='siteNeutral.0'>
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
            comments?.map((comment: any) => {
              return (
                <>
                  {
                    comment.parent_post === null &&
                    <CommentBoxComponent
                      loggedInUser={user.isLoggedin}
                      id={comment.id}
                      key={comment.id}
                      img={endpoint + comment.user_details.user_image}
                      like={comment.likes}
                      name={comment.user_details.name}
                      time={comment.time_when_posted}
                      content={comment.post_content} />
                  }
                  {
                    comments?.map((reply: any) => {
                      if (reply.parent_post === comment.id) {
                        return (
                          <Flex align={'flex-end'} direction="column" w={'50rem'}>
                            <CommentBoxComponent
                              replyDisabled={true}
                              marginLeft={'2rem'}
                              wid={'45rem'}
                              loggedInUser={user.isLoggedin}
                              id={reply.id}
                              key={reply.id}
                              img={endpoint + reply.user_details.user_image}
                              like={reply.likes}
                              name={reply.user_details.name}
                              time={reply.time_when_posted}
                              content={reply.post_content} />
                          </Flex>
                        )
                      }
                    })
                  }
                </>

              )

            })
        }
        {user.isLoggedin && <ReplyBoxComponent />}
      </Flex>
    </AppShell>
  );
}
