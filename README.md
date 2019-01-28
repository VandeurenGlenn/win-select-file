# win-select-file
> Windows OpenFileDialog Form.

![hero]

## install
```sh
npm i --save win-select-file
```

## usage
```js
import selectFolder from 'win-select-file';

const root = 'd://'; // default c://
const multiSelect = 1; // default 0
const checkFileExists = 0; // default 1

selectFolder({root, description, newFolderButton})
  .then(result => {
    if (result === 'cancelled') console.log('Cancelled by user');
    else console.log(result); // logs selected file
  })
  .catch(err => console.error(err))

```

## API winSelectFolder([options])
### options
`root`: defaults to 'c://'<br>
`multiSelect`: defaults to 0<br>
`checkFileExists`: defaults to 1


## license
[MIT](LICENSE) (c) 2019 Glenn Vandeuren <vandeurenglenn@gmail.com>

[hero]: https://raw.githubusercontent.com/VandeurenGlenn/win-select-file/master/hero.png "Hero"
