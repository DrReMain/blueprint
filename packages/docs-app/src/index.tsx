/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// tslint:disable-next-line:no-submodule-imports
import "@blueprintjs/test-commons/polyfill";
import "dom4";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { docsData } from "@blueprintjs/docs-data";
import { createDefaultRenderers, ReactDocsTagRenderer, ReactExampleTagRenderer } from "@blueprintjs/docs-theme";
import { Icons } from "@blueprintjs/icons";

// this loads all the module chunks up front, so that async Icon.load() calls don't block
// tslint:disable-next-line no-submodule-imports
import "@blueprintjs/icons/lib/esm/all";

import { BlueprintDocs } from "./components/blueprintDocs";
import * as ReactDocs from "./tags/reactDocs";
import { reactExamples } from "./tags/reactExamples";

const reactDocs = new ReactDocsTagRenderer(ReactDocs as any);
const reactExample = new ReactExampleTagRenderer(reactExamples);

const tagRenderers = {
    ...createDefaultRenderers(),
    reactDocs: reactDocs.render,
    reactExample: reactExample.render,
};

Icons.loadAll({
    loader: async (name, size) => {
        return (
            await import(
                /* webpackInclude: /\.js$/ */
                /* webpackMode: "weak" */
                `@blueprintjs/icons/lib/esm/generated/${size}px/paths/${name}`
            )
        ).default;
    },
});

ReactDOM.render(
    <BlueprintDocs defaultPageId="blueprint" docs={docsData} tagRenderers={tagRenderers} useNextVersion={false} />,
    document.querySelector("#blueprint-documentation"),
);
