import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";
import { createdistancestore } from "./createdistancestore";
import { NodeCoordinates } from "./NodeCoordinates";

export function getstoreofnode_coordinates(
    node_coordinates: NodeCoordinates,
    round = false,
): MatrixSymmetry {
    return (
        cachenode_coordinatestostore.get(node_coordinates) ??
        createdistancestore(node_coordinates, round)
    );
}
