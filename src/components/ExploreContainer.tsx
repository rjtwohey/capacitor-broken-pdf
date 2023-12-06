import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {getBrokenPdf} from './brokenpdf.js'
import { getWorkingPdf } from './workingpdf.js';
import './ExploreContainer.css';
import { IonButton } from '@ionic/react';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const createPdf = async (broken: boolean) => {
    const pdfData = broken ? getBrokenPdf() : getWorkingPdf();
    console.log(pdfData)
    const pdfFile = await Filesystem.writeFile({

      path: `testpdf.pdf`,
      
      data: `data:application/pdf;base64,${pdfData}`,
      
      directory: Directory.ExternalStorage
      
      });

      console.log(pdfFile)
      const file = await Filesystem.readFile({path: pdfFile.uri})
      console.log(file)

      await FileOpener.openFile({path: pdfFile.uri});
  }

  

  return (
    <div id="container">
      <IonButton onClick={() => createPdf(true)}>Open Broken Pdf</IonButton>
      <IonButton onClick={() => createPdf(false)}>Open Working Pdf</IonButton>
    </div>
  );
};

export default ExploreContainer;
