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
import { toast } from "sonner";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "waitlist"), { name, email, timestamp: Timestamp.now() });

      await axios.post('/api/waitlist', { name, email });

      toast('✅ Successfully registered! Check your email.');
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
      toast('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-[#f8f8ff] flex justify-content items-center 2xl:px-72">
      <video
        autoPlay
        loop
        muted
        src="/bg-temp.mp4"
        className="absolute object-cover w-screen h-screen inset-0"
      />

      <div className="absolute w-screen h-screen bg-white opacity-90 inset-0" />

      <div className="mx-auto w-3/4 md:w-1/2 opacity-100 z-10">
        <Image src="/Day-Stay Logo.png" width={300} height={300} alt="logo" />
        <p className="text-center md:text-left mt-2 text-sm md:text-base lg:text-2xl md:font-semibold">
          The finest day-use booking platform in Sri Lanka
        </p>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-4 my-8">
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="text-xs rounded-full" required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs rounded-full" required />
          <Button type="submit" className="rounded-full bg-[#db2879] hover:bg-[#db2879ef] font-medium text-xs" disabled={loading}>
            {loading ? "Registering..." : "Join Our Waitlist"}
          </Button>
        </form>

        <div className="flex gap-3 justify-center md:justify-start">
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
