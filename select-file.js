import { spawn } from 'child_process';

const selectFile = ({multiSelect, root, checkFileExists}) => `
  function selectFile {
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null

    $form = New-Object System.Windows.Forms.OpenFileDialog
    $form.CheckFileExists = ${checkFileExists}
    $form.initialDirectory = '${root}'
    $form.multiSelect = ${multiSelect}
    $show = $form.showDialog()
    if ($show -eq "OK"){
      $i = 0
      $names = $form.fileNames
      foreach ($element in $form.fileNames) {
        $val = $form.fileNames.length - 1
      	if ($i - $val) {
          $names[$i] = $element + "__win-select-file__!"
        }
        $i++
      }

      return $names

    } else {
      write-error "cancelled"
    }
  }

  $folder = selectFile
  write-host $folder
`;

/**
 * @param {string} [root='c://'] - initial directory
 * @param {string} [multiSelect=1] - whether or not to select multiple files
 * @param {boolean} [checkFileExists=1] - check if file exists
 *
 * @return {Promise} selected file(s) array or 'cancelled'
 */
export default (options = {}, folder = []) => new Promise((resolve, reject) => {
  const {root = 'c://', multiSelect = 0, checkFileExists = 1} = options;

  const child = spawn('powershell.exe', [selectFile({multiSelect, root, checkFileExists})]);
  child.stdout.on('data', data => {
    data = data.toString();
    if (data.length > 1) folder = [...folder, ...data.split('__win-select-file__! ')];
  });
  child.stderr.on('data', data => {
    data = data.toString();
    if (data.includes('cancelled')) resolve('cancelled');
    else reject(data);
  });
  child.on('exit', () => {
    resolve(folder)
  });
  child.stdin.end();
})

// TODO: filter and filterIndex, etc
// https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.openfiledialog?view=netframework-4.7.2
