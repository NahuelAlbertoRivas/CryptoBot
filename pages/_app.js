import "../styles/globals.css";

// internal import
import { PROVIDER } from '../context/context'
import toast, { Toaster } from "react-hot-toast" // para mostrar notificaciones popup cuando una transacción se complete

export default function App({ Component, pageProps }) {
  return( // cualquier info. que se pase por el ' Context Provider ' estará disponible en la app
    <>
        <PROVIDER>
            <Component {...pageProps} />
        </PROVIDER>
        <Toaster />

        <script type="text/javascript" src="js/jquery.js?ver=1.0.0"></script>
        <script type="text/javascript" src="js/init.js?ver=1.0.0"></script>
        <script type="text/javascript" src="js/plugins.js?ver=1.0.0"></script>
    </> // ' Toaster ' para animaciones/estilo; obs: al usar el global, no se necesita copiar el componente en cada pág.
  );
}