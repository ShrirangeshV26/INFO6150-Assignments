import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";

const JobCard = ({ job }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {job.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.lastUpdated}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Salary: {job.salary}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {job.skills?.map((skill) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={job.applyLink}
          target="_blank"
          rel="noreferrer"
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
