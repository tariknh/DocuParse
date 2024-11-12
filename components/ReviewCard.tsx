type RatingProps = {
  keyTopics: string[];
  score: string;
  matchedTopics: string[];
  feedback: string;
};
const ReviewCard = ({
  keyTopics,
  score,
  matchedTopics,
  feedback,
}: RatingProps) => {
  console.log(keyTopics, score, matchedTopics, feedback);
  return (
    <div>
      <h2>Review Summary</h2>
      <p>Score: {score}%</p>
      <p>Feedback: {feedback}</p>
      <h3>Key Topics:</h3>
      <ul>
        {keyTopics.map((topic, index) => (
          <li key={index}>
            {topic} {matchedTopics.includes(topic) ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewCard;
