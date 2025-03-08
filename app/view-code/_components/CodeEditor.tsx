// Imorting required modules
import React from "react";
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import { aquaBlue } from "@codesandbox/sandpack-themes";

// Importing custom data constants
import Constants from "@/data/Constants";

// Creating a component to show Code editor and previed for generated code
const CodeEditor = ({ generatedCode, isCodeReady }: any) => {

    // TSX to render the component
    return (
        <div className="">
            {isCodeReady ? (
                <Sandpack
                    template="react"
                    theme={aquaBlue}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                        showNavigator: true,
                        showTabs: true,
                        showLineNumbers: true,
                        editorHeight: 768,
                    }}
                    files={{
                        "/App.js": `${generatedCode}`,
                    }}
                    customSetup={{
                        dependencies: {
                            ...Constants?.DEPENDANCY
                        }
                    }}
                />
            ) : (
                <SandpackProvider
                    template="react"
                    theme={aquaBlue}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                    }}
                    files={{
                        "/app.js": {
                            code: `${generatedCode}`,
                            active: true,
                        }
                    }}
                    customSetup={{
                        dependencies: {
                            ...Constants?.DEPENDANCY
                        }
                    }}
                >
                    <SandpackLayout>
                        <SandpackCodeEditor showLineNumbers={true} showTabs={true} style={{ height: "768px" }} />
                    </SandpackLayout>
                </SandpackProvider>
            )}
        </div>
    );
};

// Exporting the component
export default CodeEditor;