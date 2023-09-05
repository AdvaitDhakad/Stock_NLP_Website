"use client";
import { createRoot } from 'react-dom/client';
import Image from "next/image";
import { useRef, useState } from "react";
import React from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';


export default function Home() {
  const [article, setArticle] = useState("")
  const [resp, setResp] = useState("")
  const [sentiment, setSentiment] = useState("")
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState("");
  const [company, setCompany] = useState("")
  const [viewcompany, setviewcompany] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [viewnews, setviewnews] = useState(false)
  const [resp2, setResp2] = useState("")



  const handleSubmitDate = async (e: ReactFormEvent<HTMLFormElement>) => {
    // setLoading2(true)
    e.preventDefault()
    const resp2 = await fetch('http://localhost:5000/api/finance/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: date, company: company }),
    })
    let resp = await resp2.json()
    let news = resp.news_links
    console.log(news)
    setviewnews(true)
    setResp2(news)
  }

  const handleSubmit = async (e: ReactFormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    console.log(e.currentTarget.value)
    const res = await fetch('http://localhost:5000/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence: article }),
    }
    )
    // let res_j = await res
    let res_j = await res.json()
    let summ = res_j.summary
    let sentiment = res_j.sentiment

    // setResp(JSON.stringify(res_j))
    setResp(summ)
    setSentiment(sentiment)
    setLoading(false)
    setviewcompany(true)

  }
  return (
    <main className="flex min-h-screen flex-col" >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-center dark:text-neutral-50">
          Next.js + Tailwind CSS + Flask
        </h1>
      </div>
      <div className="grid-cols-1 grid-rows-2 sm:grid md:grid-cols-2 ">
        <div className="mx-3 mt-6 flex flex-col self-start border-blue-950 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,004)]sm:shrink-0 sm:grow sm:basis-0 ">
          <div className="p-4 text-center rounded-md	">
            <h5 className="mb-2 text-xl rounded-md	font-medium leading-tight text-neutral-800 dark:text-neutral-50">ENTER YOUR NEWS</h5>
            <hr />
            <textarea name="news" className=" w-full pb-48 text-lg text-gray-900  bg-transparent dark:text-white" placeholder="Your News Article..."
              value={article} onChange={(e) => setArticle(e.target.value)} required ></textarea>


          </div>
          <button onClick={handleSubmit} className="py-2.5  px-4 text-xs font-medium  text-center text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            DONE
          </button>
        </div>
        <div className="mx-3 mt-6 flex flex-col self-start rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.
          04)] sm:shrink-0 sm:grow sm:basis-0">
          <div className="p-4 pb-52 text-center rounded-md	">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">SUMMARY</h5>
            <hr />
            {loading ? <div
              className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
              >
            </div>
              : <p className={" text-neutral-800 dark:text-neutral-50 text-lg rounded-md	" + sentiment}>{resp}</p>}
          </div>
        </div>
        <div className="flex flex-col mx-8" >
          {viewcompany ? <div className="p-4" >
            <h5 className="mb-2 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50">COMPANY ANALYSIS</h5>
            <hr />
            <div className='mt-6'>
              <h2 className=' text-neutral-800 dark:text-neutral-50'>Enter the date
                of the news</h2>
              <DatePicker selected={date}
                defaultValue={dayjs('2023/01/01', 'YYYY/MM/DD')}
                format={'YYYY/MM/DD'}
                onChange={(date) => {
                  setDate(date)
                }} />
              <div className="mt-6">
                <h2 className=' text-neutral-800 dark:text-neutral-50'>Enter Company of whichh the news is about </h2>
                <input type="text" name="company" className="mt-6 w-18 pb-2 text-lg text-gray-900  bg-transparent dark:text-white" placeholder="Company Name..." value={company} onChange={(e) => setCompany(e.target.value)} required /> <button onClick={handleSubmitDate} className="py-2.5  px-4 text-xs font-medium  text-center text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                  DONE
                </button>
              </div>
            </div>

          </div> : null}
        </div>
        <div className="flex flex-col mx-8" >
          {viewnews ? <div className="" >
            <h5 className="mb-2 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50">LINK TO COMPANY NEWS</h5>
            <hr />
            {/* <ul className='text-neutral-800 dark:text-neutral-50'><a href={resp2} /><p>Link</p></ul> */}
            <ul className='text-neutral-800 dark:text-neutral-50'>{resp2}</ul>
          </div> : null}
        </div>
      </div>
    </main>
  );
}
