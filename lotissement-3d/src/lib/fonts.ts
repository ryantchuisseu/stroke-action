import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { POLICE } from "../config";

// Police variable embarquée (Montserrat) : chargée avant le rendu de chaque image
loadFont({ family: POLICE.famille, url: staticFile(POLICE.fichier), weight: "100 900" });
