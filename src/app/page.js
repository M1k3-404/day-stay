"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import axios from "axios";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, "waitlist"), { name, email, timestamp: Timestamp.now() });

      await axios.post('/api/waitlist', { name, email });

      setMessage('✅ Successfully registered! Check your email.');
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-[#f8f8ff] flex justify-content items-center">
      <video
        autoPlay
        loop
        muted
        src="/bg-temp.mp4"
        className="absolute object-cover w-full h-full inset-0"
      />

      <div className="absolute w-full h-full bg-white opacity-50 inset-o" />

      <div className="mx-auto w-1/2 opacity-100 z-10">
        <Image src="/Day-Stay Logo.png" width={300} height={300} alt="logo" />
        <p className="text-left mt-2 text-2xl font-semibold">
          The finest day-use booking platform in Sri Lanka
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 my-8">
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-full placeholder:text-white" required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full placeholder:text-white" required />
          <Button type="submit" className="rounded-full bg-[#db2879] hover:bg-[#db2879ef] font-medium" disabled={loading}>
            {loading ? "Registering..." : "Join our Waitlist"}
          </Button>
          {/* {message && <p className="text-center text-sm">{message}</p>} */}
        </form>

        <div className="flex gap-3">
          <Link href={"https://www.facebook.com/people/DayStaylk/61571572059968/"}>
            <FaFacebook className="text-lg text-[#db2879]"  />
          </Link>
          <Link href={"https://www.instagram.com/daystay.lk/"}>
            <FaInstagram className="text-lg text-[#db2879]" />
          </Link>
          <Link href={"https://www.tiktok.com/@daystay.lk"}>
            <FaTiktok className="text-lg text-[#db2879]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
