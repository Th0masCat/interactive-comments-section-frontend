import { AppShell, Flex } from "@mantine/core";

import CommentBoxComponent from "./CommentBoxComponent";
import ReplyBoxComponent from "./ReplyBoxComponent";
import SkeletonComponent from "./SkeletonComponent";
import LoginModal from "./LoginModal";

import useUser from "../helpers/useUser";
import { endpoint } from "../helpers/useUser";

import avatar from '../../images/avatars/image-amyrobson.png'

import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { useEffect } from "react";

export default function HomePage() {
  const { comments, isLoading } = useUser(endpoint + '/api/toka')
  const user = useRecoilValue(userState)

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
      <LoginModal />
      <Flex direction="column" align="center" gap={'md'}>
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
