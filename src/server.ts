import app from './index'
import config from './config/config';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
