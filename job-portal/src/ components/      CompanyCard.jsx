import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const CompanyCard = ({ company }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={company.url}
        alt={company.name}
      />
      <CardContent>
        <Typography variant="h6">{company.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
