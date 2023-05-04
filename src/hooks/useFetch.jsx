import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [err, setErr] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };
  const putData = (putData) => {
    setOptions({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    });
  };
  const patchData = (patchData) => {
    setOptions({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    });
  };

  const deleteData = () => {
    setOptions({
      method: "DELETE",
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setErr(null);
      } catch (err) {
        if (err.name === "AbortError") {
          // console.log(err);
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setErr("Could not fetch the data");
        }
      }
    };

    // invoke the function
    if (method === "GET") {
      fetchData();
    }
    if (
      (method === "POST" ||
        method === "PUT" ||
        method === "PATCH" ||
        method === "DELETE") &&
      options
    ) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isPending, err, postData, putData, patchData, deleteData };
};
