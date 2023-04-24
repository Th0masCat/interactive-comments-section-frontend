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
      <LoginModal/>
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
                <CommentBoxComponent
                  loggedInUser = {user.isLoggedin}
                  id={comment.id}
                  key={comment.id}
                  img={endpoint + comment.user_details.user_image}
                  like={comment.likes}
                  name={comment.user_details.name}
                  time={comment.time_when_posted}
                  content={comment.post_content} />
              )
            })
        }
        {user.isLoggedin && <ReplyBoxComponent />}
      </Flex>
    </AppShell>
  );
}
