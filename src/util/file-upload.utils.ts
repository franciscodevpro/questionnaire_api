export const generateFileName = (ext: string) => {
  const date = new Date();
  const stringDate = `${date.getFullYear()}_${
    date.getMonth() + 1
  }_${date.getDate()}_${date.getHours()}_`;
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return stringDate + uniqueSuffix + '.' + ext;
};

export const diskStorageConfiguration = () => ({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, generateFileName(file.originalname.split('.').slice(-1)[0]));
  },
});
