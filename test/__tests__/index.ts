import "core-js/actual/array/at";
import { test_issubroutecycle } from "../test-issubroutecycle";
import { test_population_relative_information_entropy } from "../test-population-relative-information-entropy";
import { testcheckcurrentsegmentsintersectnextsegment } from "../testcheckcurrentsegmentsintersectnextsegment";
import { testclosedtotalpathlength } from "../testclosedtotalpathlength";
import { testgeteuclideandistance } from "../testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "../testgetPheromonessetPheromones";
import { testpathsequalinbothdirections } from "../testpathsequalinbothdirections";
import { testpathTabooList } from "../testPathTabooList";
import { testrobustsegmentintersect } from "../testrobustsegmentintersect";
import { testgreedynodecoordinates6 } from "../testgreedynodecoordinates6";
// import { testMatrix } from "../test-sparse-matrix";

it("main test functions", () => {
    testgetPheromonessetPheromones();

    testgeteuclideandistance();
    testpathsequalinbothdirections();
    testrobustsegmentintersect();

    // testdrawlinechart();

    test_population_relative_information_entropy();

    test_issubroutecycle();
    testpathTabooList();
    testcheckcurrentsegmentsintersectnextsegment();
    testclosedtotalpathlength();
    testgreedynodecoordinates6();
    // testMatrix();
});

