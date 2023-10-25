import { Tweet } from 'react-tweet'

export const TweetEmbed = (props) => {
  return (
    <div className='flex flex items-center justify-center'>
      <Tweet id={`${props.tweetId}`} />
    </div>
  )
}