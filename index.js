const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('🤮🤮🤮');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('🤮🤮🤮');
      resolve('🐕');
    });
  });
};

// async / await

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const promise1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const promise2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const promise3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([promise1, promise2, promise3]);
    const images = all.map(item => item.body.message);
    console.log(images);

    await writeFilePromise('dog-img.txt', images.join('\n'));
    console.log('Image saved!');
  } catch (error) {
    console.error(error);
    throw error;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Starting dog pic');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Finished dog pic');
  } catch (error) {
    console.console.error('ERROR');
  }
})();

// promise chain

// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFilePromise('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Image saved!');
//   })
//   .catch(error => {
//     console.error(error);
//   });
