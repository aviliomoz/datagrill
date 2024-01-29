"use client"

import { getUserProfile } from "@/functions/user";
import { useProfileStore } from "@/stores/profile-store";
import { useEffect } from "react";

export const ProfileStoreProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { setProfile } = useProfileStore();

  useEffect(() => {
    getUserProfile().then((profile) => profile && setProfile(profile));
  }, []);

  return children;
};
