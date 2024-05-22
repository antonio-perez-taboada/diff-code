import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  coldarkCold,
  lucario,
  materialDark,
  materialOceanic,
  nightOwl,
  synthwave84,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeDiff = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const [coveredStyleIndex, setCoveredStyleIndex] = useState(0);

  const themes = [
    oneDark,
    lucario,
    coldarkCold,
    materialDark,
    materialOceanic,
    nightOwl,
    synthwave84,
  ];

  const coveredStyles = [
    {
      style: { display: "block", boxShadow: "none" },
      covered: "inset 4px 0px 5px 0 #2d9c3c",
      notCovered: "inset 4px 0px 5px 0 #ff0000",
    },
    {
      style: {},
      covered: "inset 10px 0px 0px 0 #2d9c3c",
      notCovered: "inset 10px 0px 0px 0 #ff0000",
    },
    {
      style: {},
      covered: "0px 1px 0px 0 #2d9c3c",
      notCovered: "0px 1px 0px 0 #ff0000",
    },
    {
      style: { display: "block" },
      covered: "inset 10px 0px 0px 0 #2d9c3c",
      notCovered: "inset 10px 0px 0px 0 #ff0000",
    },
    {
      style: { display: "block" },
      covered: "0px 1px 0px 0 #2d9c3c",
      notCovered: "0px 1px 0px 0 #ff0000",
    },
  ];

  const coveredLines = [13, 14, 15, 16, 17, 18, 31, 33, 34, 50];
  const notCoveredLines = [32, 38];

  const changeTheme = () => {
    if (themeIndex === themes.length - 1) {
      setThemeIndex(0);
    } else {
      setThemeIndex(themeIndex + 1);
    }
  };

  const changeCoveredStyle = () => {
    if (coveredStyleIndex === coveredStyles.length - 1) {
      setCoveredStyleIndex(0);
    } else {
      setCoveredStyleIndex(coveredStyleIndex + 1);
    }
  };

  return (
    <div>
      <button onClick={() => changeTheme()}>Change Theme</button>
      <button onClick={() => changeCoveredStyle()}>Change Covered Style</button>

      <SyntaxHighlighter
        language="java"
        style={themes[themeIndex]}
        wrapLines
        showLineNumbers
        lineProps={(lineNumber) => {
          const coveredStyle = coveredStyles[coveredStyleIndex];
          const style = { ...coveredStyle.style };
          if (coveredLines.includes(lineNumber)) {
            style.boxShadow = coveredStyle.covered;
          } else if (notCoveredLines.includes(lineNumber)) {
            style.boxShadow = coveredStyle.notCovered;
          }
          return { style };
        }}
      >
        {codeString}
      </SyntaxHighlighter>

      <p>
        <strong>Green lines</strong> are covered lines.{" "}
        <strong>Red lines</strong> are not covered lines.
      </p>
    </div>
  );
};

const codeString = `
/**
 * Metodo encargado de mergear dos objetos de un mismo tipo y devolverlo como un
 * solo objeto
 * 
 * @param <T>
 * @param objectPriority
 * @param object
 * @param clazz
 * @return
 */
public <T> T mergeObjects(Object objectPriority, Object object, Class<T> clazz) {
    JsonObject jsonPriority = JsonParser.parseString(gsonWithoutNulls.toJson(objectPriority)).getAsJsonObject();
    JsonObject jsonReturn = toJsonObject(object);
    for (Entry<String, JsonElement> entry : jsonPriority.entrySet()) {
        jsonReturn.add(entry.getKey(), entry.getValue());
    }
    return gsonWithNulls.fromJson(jsonReturn.toString(), clazz);
}

/**
 * Metodo encargado de pasar un json a string unicamente con los atributos de
 * una clase.
 * 
 * @param <T>
 * @param json
 * @param clazz
 * @return
 */
public <T> String jsonToStringWithFilter(JsonObject json, Class<T> clazz) {
    if (json.has(Parametros.SERVICIO)) {
        json = cleanJsonFromCaser(json);
    }
    return gsonWithNulls.toJson(jsonToObject(json, clazz));
}

public JsonObject cleanJsonFromCaser(JsonObject json) {
    return json.getAsJsonObject(Parametros.SERVICIO);
}

/**
 * Metodo encargado de mapear un json en una objeto.
 * 
 * @param <T>
 * @param json
 * @param clazz
 * @return
 */
public <T> T jsonToObject(JsonObject json, Class<T> clazz) {
    return gsonWithNulls.fromJson(json.toString(), clazz);
}
`;
