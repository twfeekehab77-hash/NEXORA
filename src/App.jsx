import { useEffect, useState } from "react";
import Login from "./Login";
import { supabase } from "./lib/supabaseClient";
import "./App.css";
import { languages, getLanguage, getTranslations, getSavedLanguage, applyLanguage } from "./i18n";

function NIcon({ name, size = 21, stroke = 2 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
  };

  const icons = {
    Home: (
      <path
        fill="currentColor"
        d="M12 2.8 3.7 9.45a1.8 1.8 0 0 0-.7 1.42v8.75A2.38 2.38 0 0 0 5.38 22h4.3v-6.25h4.64V22h4.3A2.38 2.38 0 0 0 21 19.62v-8.75a1.8 1.8 0 0 0-.7-1.42L12 2.8Z"
      />
    ),
    Explore: (
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm3.92 5.83a.9.9 0 0 1 .01.84l-2.37 4.62a1.8 1.8 0 0 1-.78.78l-4.62 2.37a.9.9 0 0 1-1.22-1.22l2.37-4.62a1.8 1.8 0 0 1 .78-.78l4.62-2.37a.9.9 0 0 1 1.21.38Zm-3.46 4.2a.68.68 0 1 0-.96-.96.68.68 0 0 0 .96.96Z"
        clipRule="evenodd"
      />
    ),
    Messages: (
      <path
        fill="currentColor"
        d="M12 3.1c-5.1 0-9.25 3.45-9.25 7.7 0 2.42 1.38 4.58 3.53 5.98l-.96 3.02a.7.7 0 0 0 .99.82l3.48-1.84c.71.17 1.45.26 2.21.26 5.1 0 9.25-3.45 9.25-7.7S17.1 3.1 12 3.1Zm-4.15 7.7a1.05 1.05 0 1 1 2.1 0 1.05 1.05 0 0 1-2.1 0Zm3.1 0a1.05 1.05 0 1 1 2.1 0 1.05 1.05 0 0 1-2.1 0Zm3.1 0a1.05 1.05 0 1 1 2.1 0 1.05 1.05 0 0 1-2.1 0Z"
      />
    ),
    Notifications: (
      <path
        fill="currentColor"
        d="M12 2.7a6.05 6.05 0 0 0-6.05 6.05v3.04c0 .94-.28 1.86-.8 2.65l-1.07 1.62a1.2 1.2 0 0 0 1 1.86h13.84a1.2 1.2 0 0 0 1-1.86l-1.07-1.62a4.78 4.78 0 0 1-.8-2.65V8.75A6.05 6.05 0 0 0 12 2.7Zm0 18.55a2.65 2.65 0 0 0 2.5-1.8h-5a2.65 2.65 0 0 0 2.5 1.8Z"
      />
    ),
    Profile: (
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2.6a9.4 9.4 0 1 0 0 18.8 9.4 9.4 0 0 0 0-18.8ZM12 5.2a3.15 3.15 0 1 1 0 6.3 3.15 3.15 0 0 1 0-6.3Zm-5.2 12.9a5.5 5.5 0 0 1 10.4 0 6.8 6.8 0 0 1-10.4 0Z"
        clipRule="evenodd"
      />
    ),
    Search: (
      <>
        <circle cx="10.6" cy="10.6" r="6.7" fill="none" stroke="currentColor" strokeWidth={stroke} />
        <path d="m15.7 15.7 5 5" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      </>
    ),
    Message: (
      <path
        fill="currentColor"
        d="M12 4c-4.6 0-8.3 3.05-8.3 6.82 0 2.1 1.1 3.98 2.84 5.23l-.77 2.6a.65.65 0 0 0 .91.78l3.04-1.7c.72.2 1.48.3 2.28.3 4.6 0 8.3-3.05 8.3-6.82S16.6 4 12 4Z"
      />
    ),
    User: (
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21a8 8 0 0 1 16 0H4Z"
        clipRule="evenodd"
      />
    ),
    Plus: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="6" fill="currentColor" />
        <path d="M12 8v8M8 12h8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    ArrowLeft: (
      <>
        <path d="M19 12H5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m12 19-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    Image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth={stroke} />
        <circle cx="8.5" cy="9" r="1.6" fill="currentColor" />
        <path d="m5.5 17 4.5-4.5 3.2 3 2.2-2.2 3.1 3.7" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    Smile: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={stroke} />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M8 14.2c1 1.5 2.35 2.2 4 2.2s3-.7 4-2.2" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      </>
    ),
    ChevronRight: (
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    ),
    Sliders: (
      <>
        <path d="M4 7h16M4 17h16" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        <circle cx="9" cy="7" r="2" fill="white" stroke="currentColor" strokeWidth={stroke} />
        <circle cx="15" cy="17" r="2" fill="white" stroke="currentColor" strokeWidth={stroke} />
      </>
    ),
  };

  return <svg {...common}>{icons[name] || icons.Profile}</svg>;
}

function App() {
  const [language, setLanguage] = useState(getSavedLanguage());
  const t = getTranslations(language);

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  function changeLanguage(code) {
    setLanguage(code);
    applyLanguage(code);
  }

  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const [postProfiles, setPostProfiles] = useState({});
  const [commentProfiles, setCommentProfiles] = useState({});

  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState({});
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificationActors, setNotificationActors] = useState({});
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState({});
  const [reports, setReports] = useState([]);
  const [adminBans, setAdminBans] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  const [selectedUserFollowers, setSelectedUserFollowers] = useState(0);
  const [selectedUserFollowing, setSelectedUserFollowing] = useState(0);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Home");
  const [showProfile, setShowProfile] = useState(false);

  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");

  const [postText, setPostText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");

  const [selectedStory, setSelectedStory] = useState(null);
  const [storyPreview, setStoryPreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [storyUploading, setStoryUploading] = useState(false);
  const [commenting, setCommenting] = useState({});
  const [saveMessage, setSaveMessage] = useState("");

  const menu = [
    { name: t.home, icon: "Home", key: "Home" },
    { name: t.explore, icon: "Explore", key: "Explore" },
    { name: t.messages, icon: "Messages", key: "Messages" },
    { name: t.notifications, icon: "Notifications", key: "Notifications" },
    { name: t.profile, icon: "Profile", key: "Profile" },
  ];

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session:", error);
      }

      const currentSession = data?.session || null;

      if (!mounted) return;

      setSession(currentSession);
      setLoading(false);

      if (currentSession) {
        Promise.all([
          loadHomeData(currentSession.user.id),
          loadNotifications(currentSession.user.id),
          loadFollowing(currentSession.user.id),
        ]).catch((error) => {
          console.error("Background loading:", error);
        });
      }
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return;


      setSession(newSession);

      if (newSession) {
        Promise.all([
          loadHomeData(newSession.user.id),
          loadNotifications(newSession.user.id),
          loadFollowing(newSession.user.id),
        ]).catch((error) => {
          console.error("Loading user data:", error);
        });
      } else {
        setProfile(null);
        setPosts([]);
        setStories([]);
        setLikes({});
        setComments({});
        setCommentProfiles({});
        setPostProfiles({});
        setUsers([]);
        setFollowing({});
        setMessages([]);
        setSelectedChat(null);
        setNotifications([]);
        setNotificationActors({});
        setUnreadNotifications(0);
        setSearchText("");
        setSearchResults([]);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function blockUser(userId, reason = "Blocked by user") {
    if (!session || !userId || userId === session.user.id) return;

    const { error } = await supabase
      .from("user_bans")
      .insert({
        user_id: userId,
        banned_by: session.user.id,
        reason,
      });

    if (error) {
      console.error("Block user:", error);
      setSaveMessage(error.message);
      return;
    }

    setBlockedUsers((prev) => ({ ...prev, [userId]: true }));
    setSaveMessage("User blocked successfully.");
  }

  async function reportUser(userId, reason = "Other", details = "") {
    if (!session) {
      setSaveMessage("You must be logged in to report a user.");
      return;
    }

    if (!userId) {
      setSaveMessage("No user selected to report.");
      return;
    }

    if (userId === session.user.id) {
      setSaveMessage("You cannot report yourself.");
      return;
    }

    setSaveMessage("Sending report...");

    const { data, error } = await supabase
      .from("user_reports")
      .insert({
        reporter_id: session.user.id,
        reported_user_id: userId,
        reason,
        details,
      })
      .select()
      .single();

    if (error) {
      console.error("Report user:", error);
      setSaveMessage("Report failed: " + error.message);
      return;
    }

    console.log("Report created:", data);
    setSaveMessage("Report submitted successfully.");
  }

  async function loadBlockedUsers(userId) {
    if (!userId) return;

    const { data, error } = await supabase
      .from("user_bans")
      .select("user_id")
      .eq("banned_by", userId);

    if (error) {
      console.error("Blocked users:", error);
      return;
    }

    const blockedData = {};

    (data || []).forEach((ban) => {
      blockedData[ban.user_id] = true;
    });

    setBlockedUsers(blockedData);
  }

  async function loadDeveloperReports() {
    if (!profile?.is_owner) return;

    const { data, error } = await supabase
      .from("user_reports")
      .select("id,reporter_id,reported_user_id,reason,details,status,created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Developer reports:", error);
      return;
    }

    setReports(data || []);
  }

  async function loadDeveloperBans() {
    if (!profile?.is_owner) return;

    const { data, error } = await supabase
      .from("user_bans")
      .select("id,user_id,banned_by,reason,created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Developer bans:", error);
      return;
    }

    setAdminBans(data || []);
  }

  async function loadTotalNotifications() {
    const { count, error } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("Total notifications:", error);
      return;
    }

    setTotalNotifications(count || 0);
  }

  async function loadTotalPosts() {
    const { count, error } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("Total posts:", error);
      return;
    }

    setTotalPosts(count || 0);
  }

  async function loadTotalUsers() {
    const { count, error } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("Total users:", error);
      return;
    }

    setTotalUsers(count || 0);
  }

  async function loadHomeData(userId) {
    await Promise.all([
      loadProfile(userId),
      loadPosts(userId),
      loadStories(),
      loadTotalUsers(),
      loadBlockedUsers(userId),
      loadTotalPosts(),
      loadTotalNotifications(),
    ]);

    if (userId === "e4a5054b-981a-483e-bcec-3017d120c13f") {
      await Promise.all([
        loadDeveloperReports(),
        loadDeveloperBans(),
      ]);
    }
  }

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id,username,full_name,avatar_url,bio,is_owner")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile:", error);
      return;
    }

    if (data) {
      setProfile(data);
      setEditName(data.full_name || "");
      setEditUsername(data.username || "");
      setEditBio(data.bio || "");
    }
  }

  async function loadFollowing(userId) {
    if (!userId) return;

    const { data, error } = await supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", userId);

    if (error) {
      console.error("Following:", error);
      return;
    }

    const followingData = {};

    (data || []).forEach((follow) => {
      followingData[follow.following_id] = true;
    });

    setFollowing(followingData);
  }

  async function toggleFollow(userId) {
    if (!session || !userId || userId === session.user.id) return;

    const isFollowing = !!following[userId];

    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", session.user.id)
        .eq("following_id", userId);

      if (error) {
        console.error("Unfollow:", error);
        setSaveMessage(error.message);
        return;
      }

      setFollowing((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });

      return;
    }

    const { error } = await supabase.from("follows").insert({
      follower_id: session.user.id,
      following_id: userId,
    });

    if (error) {
      console.error("Follow:", error);
      setSaveMessage(error.message);
      return;
    }

    setFollowing((prev) => ({
      ...prev,
      [userId]: true,
    }));
  }

  async function loadUsers() {
    if (!session) return;

    await loadFollowing(session.user.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("id,username,full_name,avatar_url,bio")
      .neq("id", session.user.id)
      .order("username", { ascending: true });

    if (error) {
      console.error("Users:", error);
      setSaveMessage(error.message);
      return;
    }

    setUsers(data || []);
  }

  async function performUserSearch(text) {
    if (!session || !text) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);

    const [usernameResult, nameResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("id,username,full_name,avatar_url,bio")
        .neq("id", session.user.id)
        .ilike("username", `%${text}%`)
        .limit(20),

      supabase
        .from("profiles")
        .select("id,username,full_name,avatar_url,bio")
        .neq("id", session.user.id)
        .ilike("full_name", `%${text}%`)
        .limit(20),
    ]);

    if (usernameResult.error) {
      console.error("Username search:", usernameResult.error);
    }

    if (nameResult.error) {
      console.error("Name search:", nameResult.error);
    }

    if (usernameResult.error && nameResult.error) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const combined = [
      ...(usernameResult.data || []),
      ...(nameResult.data || []),
    ];

    const uniqueUsers = [];
    const seenIds = new Set();

    combined.forEach((user) => {
      if (!seenIds.has(user.id)) {
        seenIds.add(user.id);
        uniqueUsers.push(user);
      }
    });

    setSearchResults(uniqueUsers.slice(0, 20));
    setSearchLoading(false);
  }

  useEffect(() => {
    const text = searchText.trim();

    if (!text) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      performUserSearch(text);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchText, session]);

  async function startChatFromSearch(user) {
    setSearchText("");
    setSearchResults([]);
    setActive("Messages");
    setShowProfile(false);

    await openChat(user);
  }

  async function openUserProfile(user) {
    if (!user || !session) return;

    setUserProfileLoading(true);
    setSelectedUserProfile(user);
    setSelectedUserPosts([]);
    setSelectedUserFollowers(0);
    setSelectedUserFollowing(0);
    setSearchText("");
    setSearchResults([]);
    setShowProfile(false);

    const [postsResult, followersResult, followingResult] =
      await Promise.all([
        supabase
          .from("posts")
          .select(
            "id,user_id,content,created_at,media_url,media_type"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),

        supabase
          .from("follows")
          .select("id", { count: "exact", head: true })
          .eq("following_id", user.id),

        supabase
          .from("follows")
          .select("id", { count: "exact", head: true })
          .eq("follower_id", user.id),
      ]);

    if (postsResult.error) {
      console.error("User profile posts:", postsResult.error);
    } else {
      setSelectedUserPosts(postsResult.data || []);
    }

    if (followersResult.error) {
      console.error("User profile followers:", followersResult.error);
    } else {
      setSelectedUserFollowers(followersResult.count || 0);
    }

    if (followingResult.error) {
      console.error("User profile following:", followingResult.error);
    } else {
      setSelectedUserFollowing(followingResult.count || 0);
    }

    setUserProfileLoading(false);
  }

  async function loadPosts(userId) {
    const { data, error } = await supabase
      .from("posts")
      .select("id,user_id,content,created_at,media_url,media_type")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Posts:", error);
      return;
    }

    const postData = data || [];

    setPosts(postData);

    const userIds = [
      ...new Set(
        postData.map((post) => post.user_id).filter(Boolean)
      ),
    ];

    if (userIds.length > 0) {
      const {
        data: profilesData,
        error: profilesError,
      } = await supabase
        .from("profiles")
        .select("id,username,full_name,avatar_url,is_owner")
        .in("id", userIds);

      if (profilesError) {
        console.error("Post profiles:", profilesError);
      } else {
        const profileData = {};

        (profilesData || []).forEach((user) => {
          profileData[user.id] = user;
        });

        setPostProfiles(profileData);
      }
    } else {
      setPostProfiles({});
    }

    await Promise.all([
      loadLikes(userId),
      loadComments(),
    ]);
  }

  async function loadLikes(userId) {
    const { data, error } = await supabase
      .from("post_likes")
      .select("post_id,user_id");

    if (error) {
      console.error("Likes:", error);
      return;
    }

    const likeData = {};

    (data || []).forEach((like) => {
      if (!likeData[like.post_id]) {
        likeData[like.post_id] = {
          count: 0,
          likedByMe: false,
        };
      }

      likeData[like.post_id].count += 1;

      if (like.user_id === userId) {
        likeData[like.post_id].likedByMe = true;
      }
    });

    setLikes(likeData);
  }

  async function loadComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("id,post_id,user_id,content,created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Comments:", error);
      return;
    }

    const commentData = {};

    (data || []).forEach((comment) => {
      if (!commentData[comment.post_id]) {
        commentData[comment.post_id] = [];
      }

      commentData[comment.post_id].push(comment);
    });

    setComments(commentData);

    const userIds = [
      ...new Set(
        (data || []).map((comment) => comment.user_id).filter(Boolean)
      ),
    ];

    if (userIds.length > 0) {
      const {
        data: profilesData,
        error: profilesError,
      } = await supabase
        .from("profiles")
        .select("id,username,full_name,avatar_url,is_owner")
        .in("id", userIds);

      if (profilesError) {
        console.error("Comment profiles:", profilesError);
        return;
      }

      const profileData = {};

      (profilesData || []).forEach((user) => {
        profileData[user.id] = user;
      });

      setCommentProfiles(profileData);
    } else {
      setCommentProfiles({});
    }
  }

  async function toggleLike(postId) {
    if (!session) return;

    const current = likes[postId] || {
      count: 0,
      likedByMe: false,
    };

    const userId = session.user.id;

    if (current.likedByMe) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);

      if (error) {
        setSaveMessage(error.message);
        return;
      }

      setLikes((prev) => ({
        ...prev,
        [postId]: {
          count: Math.max(0, current.count - 1),
          likedByMe: false,
        },
      }));
    } else {
      const { error } = await supabase
        .from("post_likes")
        .insert({
          post_id: postId,
          user_id: userId,
        });

      if (error) {
        setSaveMessage(error.message);
        return;
      }

      setLikes((prev) => ({
        ...prev,
        [postId]: {
          count: current.count + 1,
          likedByMe: true,
        },
      }));

      await loadNotifications(userId);
    }
  }

  async function createComment(postId) {
    const text = (commentText[postId] || "").trim();

    if (!text || !session) return;

    setCommenting((prev) => ({
      ...prev,
      [postId]: true,
    }));

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: session.user.id,
        content: text,
      })
      .select("id,post_id,user_id,content,created_at")
      .single();

    if (error) {
      setSaveMessage(error.message);
    } else if (data) {
      setCommentText((prev) => ({
        ...prev,
        [postId]: "",
      }));

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data],
      }));

      setCommentProfiles((prev) => ({
        ...prev,
        [session.user.id]: {
          id: session.user.id,
          username: profile?.username || "user",
          full_name: profile?.full_name || "You",
          avatar_url: profile?.avatar_url || "",
        },
      }));

      await loadNotifications(session.user.id);
    }

    setCommenting((prev) => ({
      ...prev,
      [postId]: false,
    }));
  }

  async function deleteComment(commentId) {
    if (!session) return;

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", session.user.id);

    if (error) {
      setSaveMessage(error.message);
      return;
    }

    setComments((prev) => {
      const updated = {};

      Object.keys(prev).forEach((postId) => {
        updated[postId] = prev[postId].filter(
          (comment) => comment.id !== commentId
        );
      });

      return updated;
    });
  }

  async function loadConversation(userId) {
    if (!session || !userId) return;

    setMessagesLoading(true);

    const currentUserId = session.user.id;

    const { data, error } = await supabase
      .from("messages")
      .select("id,sender_id,receiver_id,content,created_at")
      .or(
        `and(sender_id.eq.${currentUserId},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${currentUserId})`
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Messages:", error);
      setSaveMessage(error.message);
      setMessagesLoading(false);
      return;
    }

    setMessages(data || []);
    setMessagesLoading(false);
  }

  async function openChat(user) {
    setSelectedChat(user);
    setMessages([]);
    setMessageText("");

    await loadConversation(user.id);

    if (session) {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", session.user.id)
        .eq("actor_id", user.id)
        .eq("type", "message")
        .eq("is_read", false);

      if (error) {
        console.error("Mark message notifications:", error);
      }

      await loadNotifications(session.user.id);
    }
  }

  async function sendMessage() {
    const text = messageText.trim();

    if (!text || !session || !selectedChat || sendingMessage) {
      return;
    }

    setSendingMessage(true);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: session.user.id,
        receiver_id: selectedChat.id,
        content: text,
      })
      .select("id,sender_id,receiver_id,content,created_at")
      .single();

    if (error) {
      console.error("Send message:", error);
      setSaveMessage(error.message);
      setSendingMessage(false);
      return;
    }

    if (data) {
      setMessages((prev) => [...prev, data]);
    }

    setMessageText("");
    setSendingMessage(false);
  }

  async function loadNotifications(userId) {
    if (!userId) return;

    setNotificationsLoading(true);

    const { data, error } = await supabase
      .from("notifications")
      .select(
        "id,user_id,actor_id,type,post_id,message_id,content,is_read,created_at"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Notifications:", error);
      setNotificationsLoading(false);
      return;
    }

    const notificationData = data || [];

    setNotifications(notificationData);

    const unread = notificationData.filter(
      (notification) => !notification.is_read
    ).length;

    setUnreadNotifications(unread);

    const actorIds = [
      ...new Set(
        notificationData
          .map((notification) => notification.actor_id)
          .filter(Boolean)
      ),
    ];

    if (actorIds.length > 0) {
      const { data: actors, error: actorsError } = await supabase
        .from("profiles")
        .select("id,username,full_name,avatar_url,is_owner")
        .in("id", actorIds);

      if (actorsError) {
        console.error("Notification actors:", actorsError);
      } else {
        const actorData = {};

        (actors || []).forEach((actor) => {
          actorData[actor.id] = actor;
        });

        setNotificationActors(actorData);
      }
    } else {
      setNotificationActors({});
    }

    setNotificationsLoading(false);
  }

  async function openNotifications() {
    setActive("Notifications");
    setShowProfile(false);

    if (!session) return;

    await loadNotifications(session.user.id);

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", session.user.id)
      .eq("is_read", false);

    if (error) {
      console.error("Mark notifications:", error);
      return;
    }

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );

    setUnreadNotifications(0);
  }

  async function openNotification(notification) {
    if (!notification) return;

    if (session && !notification.is_read) {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notification.id)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Mark notification:", error);
      }
    }

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id
          ? { ...item, is_read: true }
          : item
      )
    );

    setUnreadNotifications((prev) =>
      notification.is_read
        ? prev
        : Math.max(0, prev - 1)
    );

    if (
      (notification.type === "like" ||
        notification.type === "comment") &&
      notification.post_id
    ) {
      setActive("Home");
      setShowProfile(false);

      setTimeout(() => {
        const postElement = document.getElementById(
          `post-${notification.post_id}`
        );

        if (postElement) {
          postElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          postElement.style.transition =
            "box-shadow 0.3s ease";

          postElement.style.boxShadow =
            "0 0 0 4px rgba(124,58,237,0.35)";

          setTimeout(() => {
            postElement.style.boxShadow = "";
          }, 1800);
        }
      }, 100);
    }

    if (
      notification.type === "message" &&
      notification.actor_id
    ) {
      const actor =
        notificationActors[notification.actor_id];

      if (actor) {
        await openChat(actor);
        setActive("Messages");
        setShowProfile(false);
      } else {
        setActive("Messages");
        setShowProfile(false);
        await loadUsers();
      }
    }
  }

  function notificationIcon(type) {
    if (type === "like") return "❤️";
    if (type === "comment") return "💬";
    if (type === "message") return "✉️";
    if (type === "follow") return "👤";
    return "🔔";
  }

  function notificationTitle(type) {
    if (type === "like") return "إعجاب جديد";
    if (type === "comment") return "تعليق جديد";
    if (type === "message") return "رسالة جديدة";
    if (type === "follow") return "متابعة جديدة";
    return "إشعار جديد";
  }

  function notificationActorName(notification) {
    const actor =
      notificationActors[notification.actor_id];

    if (!actor) {
      return "مستخدم NEXORA";
    }

    return (
      actor.full_name ||
      actor.username ||
      "مستخدم NEXORA"
    );
  }

  function notificationContent(notification) {
    const actorName =
      notificationActorName(notification);

    if (notification.type === "like") {
      return `${actorName} أعجب بمنشورك ❤️`;
    }

    if (notification.type === "comment") {
      return `${actorName} علّق على منشورك 💬`;
    }

    if (notification.type === "message") {
      return `${actorName} أرسل لك رسالة ✉️`;
    }

    if (notification.type === "follow") {
      return `${actorName} بدأ بمتابعتك 👤`;
    }

    if (notification.content) {
      return notification.content;
    }

    return "لديك إشعار جديد 🔔";
  }

  function handleMediaSelect(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }

    setSelectedMedia(file);
    setMediaPreview(URL.createObjectURL(file));
  }

  function removeSelectedMedia() {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }

    setSelectedMedia(null);
    setMediaPreview("");
  }

  async function uploadPostMedia(file) {
    const fileExt = file.name.split(".").pop();
    const fileName =
      `${session.user.id}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("post-media")
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("post-media")
      .getPublicUrl(fileName);

    return {
      url: data.publicUrl,
      type: file.type.startsWith("video/")
        ? "video"
        : "image",
    };
  }

  async function createPost() {
    const text = postText.trim();

    if (!text && !selectedMedia) return;
    if (!session) return;

    setPosting(true);
    setSaveMessage("");

    try {
      let mediaUrl = null;
      let mediaType = null;

      if (selectedMedia) {
        setUploading(true);

        const uploaded =
          await uploadPostMedia(selectedMedia);

        mediaUrl = uploaded.url;
        mediaType = uploaded.type;

        setUploading(false);
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({
          user_id: session.user.id,
          content: text || "",
          media_url: mediaUrl,
          media_type: mediaType,
        })
        .select(
          "id,user_id,content,created_at,media_url,media_type"
        )
        .single();

      if (error) {
        setSaveMessage(error.message);
        return;
      }

      setPostText("");
      removeSelectedMedia();

      if (data) {
        setPosts((prev) => [data, ...prev]);

        setPostProfiles((prev) => ({
          ...prev,
          [session.user.id]: {
            id: session.user.id,
            username: profile?.username || "user",
            full_name:
              profile?.full_name || "NEXORA User",
            avatar_url: profile?.avatar_url || "",
          },
        }));
      }

      setSaveMessage("تم نشر المنشور بنجاح ✅");
    } catch (error) {
      setSaveMessage(error.message);
    } finally {
      setUploading(false);
      setPosting(false);
    }
  }

  async function loadStories() {
    const { data, error } = await supabase
      .from("stories")
      .select(
        "id,user_id,media_url,media_type,created_at,expires_at"
      )
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Stories:", error);
      return;
    }

    setStories(data || []);
  }

  function handleStorySelect(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (storyPreview) {
      URL.revokeObjectURL(storyPreview);
    }

    setSelectedStory(file);
    setStoryPreview(URL.createObjectURL(file));
  }

  function removeSelectedStory() {
    if (storyPreview) {
      URL.revokeObjectURL(storyPreview);
    }

    setSelectedStory(null);
    setStoryPreview("");
  }

  async function uploadStoryMedia(file) {
    const fileExt = file.name.split(".").pop();
    const fileName =
      `${session.user.id}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("stories")
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("stories")
      .getPublicUrl(fileName);

    return {
      url: data.publicUrl,
      type: file.type.startsWith("video/")
        ? "video"
        : "image",
    };
  }

  async function createStory() {
    if (!selectedStory || !session) return;

    setStoryUploading(true);
    setSaveMessage("");

    try {
      const uploaded =
        await uploadStoryMedia(selectedStory);

      const { data, error } = await supabase
        .from("stories")
        .insert({
          user_id: session.user.id,
          media_url: uploaded.url,
          media_type: uploaded.type,
        })
        .select(
          "id,user_id,media_url,media_type,created_at,expires_at"
        )
        .single();

      if (error) {
        setSaveMessage(error.message);
        return;
      }

      removeSelectedStory();

      if (data) {
        setStories((prev) => [data, ...prev]);
      }

      setSaveMessage("تم نشر الـ Story بنجاح ✅");
    } catch (error) {
      setSaveMessage(error.message);
    } finally {
      setStoryUploading(false);
    }
  }

  async function deleteStory(storyId) {
    if (!session) return;

    const { error } = await supabase
      .from("stories")
      .delete()
      .eq("id", storyId)
      .eq("user_id", session.user.id);

    if (error) {
      setSaveMessage(error.message);
      return;
    }

    setSelectedStory(null);

    setStories((prev) =>
      prev.filter((story) => story.id !== storyId)
    );

    setSaveMessage("تم حذف الـ Story ✅");
  }

  async function saveProfile() {
    if (!session) return;

    setSaving(true);
    setSaveMessage("");

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: editName,
        username: editUsername,
        bio: editBio,
      })
      .eq("id", session.user.id)
      .select(
        "id,username,full_name,avatar_url,bio"
      )
      .single();

    if (error) {
      setSaveMessage(error.message);
    } else {
      setProfile(data);
      setSaveMessage("تم حفظ التعديلات بنجاح ✅");

      setPostProfiles((prev) => ({
        ...prev,
        [session.user.id]: {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
        },
      }));

      setCommentProfiles((prev) => ({
        ...prev,
        [session.user.id]: {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
        },
      }));
    }

    setSaving(false);
  }

  async function uploadAvatar(event) {
    const file = event.target.files?.[0];

    if (!file || !session) return;

    setSaving(true);
    setSaveMessage("");

    const fileExt = file.name.split(".").pop();
    const filePath =
      `${session.user.id}.${fileExt}`;

    const { error: uploadError } =
      await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

    if (uploadError) {
      setSaveMessage(uploadError.message);
      setSaving(false);
      return;
    }

    const { data: publicUrlData } =
      supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

    const { data, error: updateError } =
      await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrlData.publicUrl,
        })
        .eq("id", session.user.id)
        .select(
          "id,username,full_name,avatar_url,bio"
        )
        .single();

    if (updateError) {
      setSaveMessage(updateError.message);
    } else {
      setProfile(data);

      setPostProfiles((prev) => ({
        ...prev,
        [session.user.id]: {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
        },
      }));

      setCommentProfiles((prev) => ({
        ...prev,
        [session.user.id]: {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
        },
      }));

      setSaveMessage("تم تغيير الصورة بنجاح ✅");
    }

    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading NEXORA...
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  const avatarLetter =
    profile?.full_name?.charAt(0) || "D";

  return (
    <div className="nexora">
        <style>{`
          .content{background:#f0f2f5!important;}
          .fb-home-card{background:#fff;border:1px solid #e4e6eb;border-radius:14px;box-shadow:0 1px 2px rgba(0,0,0,.08);padding:16px;margin-bottom:14px;}
          .fb-create-head{display:flex;align-items:center;gap:12px;}
          .fb-avatar{width:42px;height:42px;border-radius:50%;overflow:hidden;background:#e4e6eb;display:flex;align-items:center;justify-content:center;font-weight:700;color:#4b5563;flex:none;}
          .fb-avatar img,.fb-story-avatar img{width:100%;height:100%;object-fit:cover;}
          .fb-composer-input{border:0;background:#f0f2f5;color:#65676b;border-radius:24px;padding:12px 16px;text-align:left;font-size:15px;flex:1;cursor:pointer;}
          .fb-composer-input:hover{background:#e8eaee;}
          .fb-composer-actions{display:flex;border-top:1px solid #e4e6eb;margin-top:14px;padding-top:10px;gap:4px;}
          .fb-action{border:0;background:transparent;display:flex;align-items:center;justify-content:center;gap:8px;flex:1;padding:10px 8px;border-radius:8px;color:#65676b;font-weight:600;font-size:14px;cursor:pointer;}
          .fb-action:hover{background:#f2f3f5;}
          .fb-action-icon{display:flex;align-items:center;justify-content:center;}
          .fb-action-icon.photo{color:#45bd62}.fb-action-icon.story{color:#8b5cf6}.fb-action-icon.feeling{color:#f7b928}
          .fb-post-textarea{width:100%;min-height:86px;margin-top:14px;border:1px solid #e4e6eb;border-radius:10px;padding:12px;resize:vertical;font:inherit;box-sizing:border-box;outline:none;}
          .fb-post-textarea:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,.12);}
          .fb-publish{width:100%;border:0;border-radius:8px;background:#7c3aed;color:#fff;font-weight:700;padding:10px 16px;margin-top:10px;cursor:pointer;}
          .fb-publish:disabled{opacity:.6;cursor:not-allowed;}
          .fb-media-preview{margin-top:12px;border:1px solid #e4e6eb;border-radius:10px;padding:8px;position:relative;}
          .fb-media-preview img,.fb-media-preview video{display:block;width:100%;max-height:420px;object-fit:contain;border-radius:8px;background:#111;}
          .fb-media-preview button{margin-top:8px;border:0;background:#f0f2f5;border-radius:8px;padding:7px 12px;cursor:pointer;}
          .fb-section-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;color:#65676b;}
          .fb-section-title h3{margin:0;color:#1c1e21;font-size:20px;}.fb-section-title span{font-size:13px;}
          .fb-stories-row{display:flex;gap:10px;overflow-x:auto;padding-bottom:3px;}
          .fb-story{width:116px;min-width:116px;border:0;background:transparent;padding:0;text-align:left;cursor:pointer;color:#1c1e21;}
          .fb-story-bg{height:178px;border-radius:12px;overflow:hidden;position:relative;background:#ddd;}
          .fb-story-bg img,.fb-story-bg video{width:100%;height:100%;object-fit:cover;display:block;}
          .fb-story strong{display:block;font-size:13px;margin:7px 3px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .create-story-bg{background:#f0f2f5;display:flex;align-items:center;justify-content:center;}
          .story-plus{width:38px;height:38px;border-radius:50%;background:#7c3aed;color:#fff;display:flex;align-items:center;justify-content:center;}
          .fb-story-avatar{position:absolute;left:8px;top:8px;width:34px;height:34px;border-radius:50%;border:3px solid #7c3aed;background:#fff;display:flex;align-items:center;justify-content:center;color:#7c3aed;font-weight:700;overflow:hidden;}
          .fb-story-preview{margin-top:14px;background:#f7f7f8;border-radius:10px;padding:12px;}.fb-story-preview img,.fb-story-preview video{width:100%;max-height:420px;object-fit:contain;border-radius:8px;background:#111;}.fb-preview-actions{display:flex;gap:8px;}.fb-preview-actions button{flex:1;}
          .fb-feed-heading{display:flex;justify-content:space-between;align-items:center;margin:18px 2px 10px;}.fb-feed-heading h2{margin:0;font-size:21px;color:#1c1e21;}.fb-feed-heading p{margin:4px 0 0;color:#65676b;font-size:13px;}.fb-feed-heading button{border:1px solid #e4e6eb;background:#fff;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:6px;cursor:pointer;}
          @media(max-width:700px){.fb-composer-actions{gap:0}.fb-action{font-size:12px;padding:9px 4px}.fb-action span:last-child{white-space:nowrap}.fb-story{width:100px;min-width:100px}.fb-story-bg{height:155px}.fb-feed-heading{align-items:flex-start;gap:8px}.fb-feed-heading button{margin-top:2px}}
        `}</style>

        <style>{`\n          .nexora { background: #f6f7fb; color: #17181c; }\n          .sidebar { background: rgba(255,255,255,.94); border-right: 1px solid #e7e8ee; box-shadow: 8px 0 30px rgba(20,20,40,.04); }\n          .logo { letter-spacing: .08em; font-weight: 800; }\n          .menu { display:flex; align-items:center; gap:12px; border-radius:12px; margin:4px 10px; transition:.18s ease; }\n          .menu:hover { background:#f1f2f6; transform:translateX(2px); }\n          .menu.active { background:#17181c; color:#fff; box-shadow:0 8px 20px rgba(23,24,28,.14); }\n          .nav-icon { width:24px; height:24px; display:grid; place-items:center; flex:none; color:#656873; transition:transform .18s ease,color .18s ease; }
          .menu.active .nav-icon { color:#fff; }
          .menu:hover .nav-icon { transform:scale(1.06); color:#17181c; }
          .menu.active:hover .nav-icon { color:#fff; }\n          .nav-label { font-weight:600; }\n          .create-btn { display:flex; align-items:center; justify-content:center; gap:8px; border-radius:12px; font-weight:700; }\n          .search { display:flex; align-items:center; gap:8px; background:#fff; border:1px solid #e5e7eb; border-radius:14px; padding:0 13px; box-shadow:0 5px 20px rgba(20,20,40,.05); }\n          .search-icon { display:grid; place-items:center; color:#737780; }\n          .search input { border:0 !important; outline:0 !important; background:transparent !important; box-shadow:none !important; }\n          .profile-mini { border:2px solid #fff; box-shadow:0 4px 14px rgba(0,0,0,.12); }\n          .public-profile-page { max-width:980px; margin:0 auto; padding-bottom:40px; }\n          .profile-back-btn { display:inline-flex; align-items:center; gap:8px; border:0; background:transparent; padding:8px 2px; color:#60636b; font-weight:700; cursor:pointer; margin-bottom:12px; }\n          .profile-back-btn:hover { color:#111; }\n          .profile-loading { padding:70px 20px; text-align:center; color:#747780; }\n          .public-profile-card, .profile-posts-card { background:#fff; border:1px solid #e7e8ee; border-radius:22px; overflow:hidden; box-shadow:0 10px 35px rgba(20,20,40,.06); }\n          .profile-cover { height:150px; background:linear-gradient(135deg,#18191d 0%,#34363d 50%,#777b84 100%); }\n          .profile-main { display:flex; gap:28px; padding:0 30px 30px; margin-top:-58px; align-items:flex-end; }\n          .profile-avatar-large { width:126px; height:126px; min-width:126px; border-radius:50%; border:6px solid #fff; background:#eceef2; display:grid; place-items:center; overflow:hidden; font-size:42px; font-weight:800; color:#50535b; box-shadow:0 8px 25px rgba(0,0,0,.15); }\n          .profile-avatar-large img { width:100%; height:100%; object-fit:cover; }\n          .profile-main-info { flex:1; padding-top:62px; min-width:0; }\n          .profile-title-row { display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }\n          .profile-title-row h2 { margin:0; font-size:28px; line-height:1.15; }\n          .profile-title-row p { margin:6px 0 0; color:#70737c; font-weight:600; }\n          .profile-actions { display:flex; gap:9px; flex-wrap:wrap; }\n          .profile-action { border:0; border-radius:11px; padding:10px 16px; display:inline-flex; align-items:center; gap:7px; font-weight:750; cursor:pointer; transition:.18s ease; }\n          .profile-action:hover { transform:translateY(-1px); }\n          .profile-action.primary { background:#17181c; color:#fff; }\n          .profile-action.secondary { background:#eef0f4; color:#17181c; }\n          .profile-bio { margin:18px 0 16px; color:#4f525a; line-height:1.55; max-width:720px; }\n          .profile-stats { display:flex; gap:28px; flex-wrap:wrap; }\n          .profile-stats div { display:flex; align-items:baseline; gap:6px; }\n          .profile-stats strong { font-size:17px; }\n          .profile-stats span { color:#777a82; font-size:14px; }\n          .profile-posts-card { margin-top:18px; }\n          .profile-tabs { height:55px; border-bottom:1px solid #ececf0; display:flex; align-items:center; padding:0 24px; }\n          .profile-tab { height:55px; display:flex; align-items:center; border-bottom:2px solid transparent; font-weight:750; color:#858891; }\n          .profile-tab.active { color:#17181c; border-bottom-color:#17181c; }\n          .profile-post-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:2px; background:#fff; }\n          .profile-post-item { aspect-ratio:1/1; position:relative; overflow:hidden; background:#eceef2; }\n          .profile-post-item img, .profile-post-item video { width:100%; height:100%; object-fit:cover; display:block; }\n          .profile-post-item:hover .profile-post-overlay { opacity:1; }\n          .profile-post-overlay { position:absolute; inset:auto 0 0; padding:24px 10px 9px; color:#fff; font-size:11px; background:linear-gradient(transparent,rgba(0,0,0,.6)); opacity:0; transition:.18s; }\n          .profile-text-post { width:100%; height:100%; display:grid; place-items:center; padding:22px; text-align:center; font-weight:650; line-height:1.5; background:linear-gradient(135deg,#f2f3f6,#e6e8ed); }\n          .profile-empty { padding:70px 20px; text-align:center; color:#747780; }\n          .profile-empty-icon { width:60px; height:60px; border-radius:50%; margin:0 auto 12px; display:grid; place-items:center; background:#f0f1f4; color:#555861; }\n          .profile-empty h3 { margin:0 0 6px; color:#25262b; }\n          .profile-empty p { margin:0; }\n          @media (max-width:760px) {\n            .profile-main { flex-direction:column; align-items:center; text-align:center; padding:0 18px 24px; margin-top:-48px; }\n            .profile-avatar-large { width:104px; height:104px; min-width:104px; }\n            .profile-main-info { width:100%; padding-top:0; }\n            .profile-title-row { flex-direction:column; align-items:center; }\n            .profile-actions { justify-content:center; }\n            .profile-stats { justify-content:center; gap:18px; }\n            .profile-post-grid { grid-template-columns:repeat(3,1fr); }\n            .profile-cover { height:125px; }\n          }\n        `}</style>\n      <style>{`
        .fb-home-layout{display:grid;grid-template-columns:minmax(0,920px) 330px;gap:26px;justify-content:center;align-items:start;max-width:1280px;margin:0 auto;padding:8px 8px 48px;}
        .fb-home-main{min-width:0;}
        .content{padding-left:24px;padding-right:24px;}
        .fb-home-card,.fb-feed-heading,.fb-stories-card{width:100%;box-sizing:border-box;}
        .fb-post-textarea{font-size:16px;min-height:110px;}
        .fb-home-card{padding:20px;}
        .fb-story{width:132px;min-width:132px;}
        .fb-story-bg{height:198px;}
        .fb-right-card{padding:16px;}

        .fb-mobile-page-title{display:none;}
        .fb-home-right{position:sticky;top:82px;display:flex;flex-direction:column;gap:14px;}
        .fb-right-card{background:#fff;border:1px solid #dddfe2;border-radius:12px;padding:14px;box-shadow:0 1px 2px rgba(0,0,0,.04);}
        .fb-right-title{font-size:17px;font-weight:700;color:#65676b;margin-bottom:12px;}
        .fb-right-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
        .fb-right-title-row strong{font-size:17px;color:#65676b;}
        .fb-right-title-row button{border:0;background:transparent;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:#65676b;}
        .fb-right-title-row button:hover{background:#f0f2f5;}
        .fb-right-profile{width:100%;border:0;background:transparent;display:flex;align-items:center;gap:10px;padding:8px;border-radius:10px;text-align:left;cursor:pointer;}
        .fb-right-profile:hover{background:#f0f2f5;}
        .fb-right-avatar{width:42px;height:42px;border-radius:50%;background:#e4e6eb;display:grid;place-items:center;overflow:hidden;font-weight:700;color:#65676b;}
        .fb-right-avatar img,.fb-contact-avatar img{width:100%;height:100%;object-fit:cover;}
        .fb-right-profile strong{display:block;font-size:14px;color:#1c1e21;}
        .fb-right-profile span{display:block;font-size:12px;color:#65676b;margin-top:2px;}
        .fb-contacts{display:flex;flex-direction:column;gap:2px;}
        .fb-contact{border:0;background:transparent;display:flex;align-items:center;gap:10px;padding:7px;border-radius:9px;cursor:pointer;text-align:left;color:#1c1e21;font-weight:600;}
        .fb-contact:hover{background:#f0f2f5;}
        .fb-contact-avatar{width:34px;height:34px;min-width:34px;border-radius:50%;background:#e4e6eb;display:grid;place-items:center;overflow:visible;position:relative;font-size:13px;}
        .fb-contact-avatar i{position:absolute;width:9px;height:9px;border-radius:50%;background:#31a24c;border:2px solid #fff;right:-1px;bottom:0;}
        .fb-no-contacts{padding:10px 4px;color:#65676b;font-size:13px;}
        .fb-shortcuts button{width:100%;border:0;background:transparent;display:flex;align-items:center;gap:10px;padding:9px 7px;border-radius:9px;text-align:left;font-weight:600;color:#1c1e21;cursor:pointer;}
        .fb-shortcuts button:hover{background:#f0f2f5;}
        .shortcut-icon{width:32px;height:32px;border-radius:50%;background:#e7f3ff;color:#1877f2;display:grid;place-items:center;}
        .fb-right-footer{font-size:11px;color:#65676b;line-height:1.6;padding:2px 8px;}
        @media(max-width:1200px){.fb-home-layout{grid-template-columns:minmax(0,820px);max-width:850px}.fb-home-right{display:none;}}
        @media(max-width:760px){.content{padding-left:10px;padding-right:10px}.fb-home-card{padding:16px}.fb-story{width:100px;min-width:100px}.fb-story-bg{height:155px}.fb-home-layout{display:block;padding:0 0 28px}.fb-mobile-page-title{display:flex;align-items:center;justify-content:space-between;padding:4px 2px 12px;color:#1c1e21}.fb-mobile-page-title strong{font-size:20px;letter-spacing:-.03em}.fb-mobile-page-title span{font-size:14px;color:#65676b}.fb-home-main{width:100%;}}
      `}</style>
      <aside className="sidebar">
        <div className="logo">NEXORA</div>

        <nav>
          {menu.map((item) => (
            <button
              key={item.key}
              className={
                active === item.key
                  ? "menu active"
                  : "menu"
              }
              onClick={() => {
                if (item.key === "Notifications") {
                  openNotifications();
                  return;
                }

                setActive(item.key);
                if (item.key !== "Profile") setSelectedUserProfile(null);
                setShowProfile(item.key === "Profile");

                if (item.key === "Messages" || item.key === "Home") {
                  loadUsers();
                }
              }}
              style={{
                position: "relative",
              }}
            >
              <span className="nav-icon"><NIcon name={item.icon} size={20} /></span>
              <span className="nav-label">{item.name}</span>

              {item.key === "Notifications" &&
                unreadNotifications > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "8px",
                      minWidth: "20px",
                      height: "20px",
                      padding: "0 5px",
                      borderRadius: "999px",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unreadNotifications > 99
                      ? "99+"
                      : unreadNotifications}
                  </span>
                )}
            </button>
          ))}
        </nav>

        <button className="create-btn" onClick={() => setActive("Home")}>
          <NIcon name="Plus" size={19} />
          <span>Create Post</span>
        </button>

        <div className="developer-card">
          <div className="avatar">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              avatarLetter
            )}
          </div>

          <div>
            <strong>
              {profile?.full_name || "Developer"}
            </strong>

            <small>
              @{profile?.username || "developer"}
            </small>
          </div>
        </div>

        <button
          className="create-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                lineHeight: 1,
              }}
            >
              🌐
            </span>

            <select
              value={language}
              onChange={(event) =>
                changeLanguage(event.target.value)
              }
              style={{
                border: "1px solid rgba(120,120,120,0.25)",
                borderRadius: "10px",
                padding: "7px 10px",
                background: "inherit",
                color: "inherit",
                cursor: "pointer",
                outline: "none",
                fontWeight: "600",
              }}
              aria-label={t.language}
            >
              {languages.map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                >
                  {item.flag} {item.native}
                </option>
              ))}
            </select>
          </div>

          <h1>{menu.find((item) => item.key === active)?.name || t.home}</h1>

          <div
            className="search"
            style={{
              position: "relative",
              zIndex: 1000,
            }}
          >
            <span className="search-icon"><NIcon name="Search" size={19} /></span>

            <input
              placeholder="Search NEXORA..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            {searchText.trim() && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  minWidth: "320px",
                  maxHeight: "420px",
                  overflowY: "auto",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.15)",
                  padding: "8px",
                }}
              >
                {searchLoading ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      opacity: 0.7,
                    }}
                  >
                    Searching...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div
                    style={{
                      padding: "25px 15px",
                      textAlign: "center",
                      opacity: 0.7,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "35px",
                        marginBottom: "8px",
                      }}
                    >
                      🔎
                    </div>

                    <div>
                      No users found
                    </div>
                  </div>
                ) : (
                  searchResults.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px",
                        borderRadius: "10px",
                        marginBottom: "4px",
                      }}
                    >
                      <div
                        className="avatar"
                        style={{
                          width: "44px",
                          height: "44px",
                          minWidth: "44px",
                        }}
                      >
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt="Avatar"
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          user.full_name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"
                        )}
                      </div>

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <strong
                          style={{
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {user.full_name ||
                            "NEXORA User"} {user.is_owner && (<span title="NEXORA Owner" style={{marginLeft:"6px",padding:"2px 6px",borderRadius:"999px",background:"linear-gradient(135deg,#f59e0b,#facc15,#d97706)",color:"#fff",fontSize:"10px",fontWeight:"800",boxShadow:"0 1px 5px rgba(245,158,11,.4)",verticalAlign:"middle"}}>👑 OWNER</span>)}
                        </strong>

                        <div
                          style={{
                            fontSize: "12px",
                            opacity: 0.65,
                            marginTop: "2px",
                          }}
                        >
                          @{user.username || "user"}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          openUserProfile(user)
                        }
                        style={{
                          border: "none",
                          borderRadius: "8px",
                          padding: "7px 9px",
                          background: "#f3f4f6",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                        title={t.profile}
                      >
                        <NIcon name="User" size={17} />
                      </button>

                      <button
                        onClick={() =>
                          startChatFromSearch(user)
                        }
                        style={{
                          border: "none",
                          borderRadius: "8px",
                          padding: "7px 9px",
                          background: "#ede9fe",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                        title={t.message}
                      >
                        <NIcon name="Message" size={17} />
                      </button>

                      <button
                        onClick={() =>
                          toggleFollow(user.id)
                        }
                        style={{
                          border: "none",
                          borderRadius: "8px",
                          padding: "7px 10px",
                          background:
                            following[user.id]
                              ? "#e5e7eb"
                              : "#7c3aed",
                          color:
                            following[user.id]
                              ? "#111"
                              : "white",
                          cursor: "pointer",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {following[user.id]
                          ? t.following
                          : t.follow}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="profile-mini">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              avatarLetter
            )}
          </div>
        </header>

        {selectedUserProfile ? (
          <section className="public-profile-page">
            <button
              className="profile-back-btn"
              onClick={() => setSelectedUserProfile(null)}
            >
              <NIcon name="ArrowLeft" size={18} />
              <span>Back</span>
            </button>

            {userProfileLoading ? (
              <div className="profile-loading">Loading profile...</div>
            ) : (
              <>
                <div className="public-profile-card">
                  <div className="profile-cover" />
                  <div className="profile-main">
                    <div className="profile-avatar-large">
                      {selectedUserProfile.avatar_url ? (
                        <img
                          src={selectedUserProfile.avatar_url}
                          alt={t.profile}
                          loading="lazy"
                        />
                      ) : (
                        selectedUserProfile.full_name?.charAt(0)?.toUpperCase() || "U"
                      )}
                    </div>

                    <div className="profile-main-info">
                      <div className="profile-title-row">
                        <div>
                          <h2>{selectedUserProfile.full_name || "NEXORA User"} {selectedUserProfile.is_owner && (<span title="NEXORA Owner" style={{marginLeft:"8px",padding:"3px 7px",borderRadius:"999px",background:"linear-gradient(135deg,#f59e0b,#facc15,#d97706)",color:"#fff",fontSize:"11px",fontWeight:"800",boxShadow:"0 2px 6px rgba(245,158,11,.4)",verticalAlign:"middle"}}>👑 OWNER</span>)}</h2>
                          <p>@{selectedUserProfile.username || "user"}</p>
                        </div>
                        <div className="profile-actions">
                          <button
                            className="profile-action secondary"
                            onClick={() => {
                              const user = selectedUserProfile;
                              setSelectedUserProfile(null);
                              setActive("Messages");
                              setShowProfile(false);
                              openChat(user);
                            }}
                          >
                            <NIcon name="Message" size={17} />
                            <span>Message</span>
                          </button>
                          <button
                            className={
                              following[selectedUserProfile.id]
                                ? "profile-action secondary"
                                : "profile-action primary"
                            }
                            onClick={() => toggleFollow(selectedUserProfile.id)}
                          >
                            <span>{following[selectedUserProfile.id] ? t.following : t.follow}</span>
                          </button>
                          <button
                            className="profile-action secondary"
                            onClick={() => blockUser(selectedUserProfile.id)}
                          >
                            <span>🚫 Block</span>
                          </button>
                          <button
                            className="profile-action secondary"
                            onClick={() => {
  console.log("REPORT BUTTON CLICKED", selectedUserProfile?.id);
  setSaveMessage("Report button clicked...");
  reportUser(selectedUserProfile.id);
}}
                          >
                            <span>⚠️ Report</span>
                          </button>
                        </div>
                      </div>

                      <p className="profile-bio">
                        {selectedUserProfile.bio || "No bio yet."}
                      </p>

                      <div className="profile-stats">
                        <div><strong>{selectedUserPosts.length}</strong><span>Posts</span></div>
                        <div><strong>{selectedUserFollowers}</strong><span>Followers</span></div>
                        <div><strong>{selectedUserFollowing}</strong><span>Following</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-posts-card">
                  <div className="profile-tabs">
                    <div className="profile-tab active">Posts</div>
                  </div>

                  {selectedUserPosts.length === 0 ? (
                    <div className="profile-empty">
                      <div className="profile-empty-icon"><NIcon name="Profile" size={28} /></div>
                      <h3>No posts yet</h3>
                      <p>When this user publishes something, it will appear here.</p>
                    </div>
                  ) : (
                    <div className="profile-post-grid">
                      {selectedUserPosts.map((post) => (
                        <article key={post.id} className="profile-post-item">
                          {post.media_url ? (
                            post.media_type === "video" ? (
                              <video src={post.media_url} controls preload="metadata" />
                            ) : (
                              <img src={post.media_url} alt="Post" loading="lazy" />
                            )
                          ) : (
                            <div className="profile-text-post">
                              <span>{post.content}</span>
                            </div>
                          )}
                          <div className="profile-post-overlay">
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        ) : active === "Developer" && profile?.is_owner ? (
          <section className="welcome">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
              <div>
                <h2>👑 Developer Control Panel</h2>
                <p>Full control center for the NEXORA owner.</p>
              </div>
              <span style={{padding:"6px 10px",borderRadius:"999px",background:"linear-gradient(135deg,#f59e0b,#facc15,#d97706)",color:"#fff",fontWeight:"800",fontSize:"12px"}}>OWNER</span>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"14px"}}>
              <div className="fb-right-card">
                <strong>👥 Users</strong>
                <h2>{totalUsers}</h2>
                <span>Loaded users</span>
              </div>

              <div className="fb-right-card">
                <strong>📝 Posts</strong>
                <h2>{totalPosts}</h2>
                <span>Loaded posts</span>
              </div>

              <div className="fb-right-card">
                <strong>🔔 Notifications</strong>
                <h2>{totalNotifications}</h2>
                <span>Unread notifications</span>
              </div>

              <div className="fb-right-card">
                <strong>💬 Messages</strong>
                <h2>{users.length}</h2>
                <span>Available contacts</span>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"16px",marginTop:"16px"}}>
              <div className="fb-right-card">
                <h3>📋 Reports ({reports.length})</h3>
                {reports.length === 0 ? (
                  <p style={{opacity:.7}}>No reports yet.</p>
                ) : (
                  <div style={{display:"grid",gap:"10px",marginTop:"12px"}}>
                    {reports.map((report) => (
                      <div key={report.id} style={{padding:"12px",borderRadius:"12px",background:"rgba(127,127,127,.08)"}}>
                        <strong>⚠️ {report.reason}</strong>
                        <div style={{fontSize:"12px",opacity:.7,marginTop:"5px"}}>
                          Reported user: {report.reported_user_id || "Unknown"}
                        </div>
                        <div style={{fontSize:"12px",opacity:.7}}>
                          Reporter: {report.reporter_id || "Unknown"}
                        </div>
                        {report.details && (
                          <div style={{marginTop:"7px",fontSize:"13px"}}>
                            {report.details}
                          </div>
                        )}
                        <div style={{fontSize:"11px",opacity:.6,marginTop:"7px"}}>
                          Status: {report.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="fb-right-card">
                <h3>🚫 Bans / Blocks ({adminBans.length})</h3>
                {adminBans.length === 0 ? (
                  <p style={{opacity:.7}}>No bans or blocks yet.</p>
                ) : (
                  <div style={{display:"grid",gap:"10px",marginTop:"12px"}}>
                    {adminBans.map((ban) => (
                      <div key={ban.id} style={{padding:"12px",borderRadius:"12px",background:"rgba(127,127,127,.08)"}}>
                        <strong>🚫 {ban.user_id}</strong>
                        <div style={{fontSize:"12px",opacity:.7,marginTop:"5px"}}>
                          Blocked by: {ban.banned_by || "Unknown"}
                        </div>
                        <div style={{fontSize:"13px",marginTop:"5px"}}>
                          {ban.reason || "No reason provided"}
                        </div>
                        <div style={{fontSize:"11px",opacity:.6,marginTop:"7px"}}>
                          {new Date(ban.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : active === "Notifications" ? (
          <section className="welcome">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>
                <h2>Notifications 🔔</h2>
                <p>
                  Stay updated with your activity.
                </p>
              </div>

              {unreadNotifications > 0 && (
                <span
                  style={{
                    background: "#ef4444",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                  }}
                >
                  {unreadNotifications} new
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {notificationsLoading ? (
                <div
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "14px",
                    background: "#fafafa",
                  }}
                >
                  <div style={{ fontSize: "45px" }}>
                    🔔
                  </div>

                  <h3>No notifications yet</h3>

                  <p style={{ opacity: 0.7 }}>
                    Your new likes, comments and messages
                    will appear here.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() =>
                      openNotification(notification)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "15px",
                      borderRadius: "14px",
                      border: "1px solid #ddd",
                      background:
                        notification.is_read
                          ? "white"
                          : "#f3e8ff",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        minWidth: "45px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#ede9fe",
                        fontSize: "22px",
                      }}
                    >
                      {notificationIcon(
                        notification.type
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <strong>
                        {notificationTitle(
                          notification.type
                        )}
                      </strong>

                      <p style={{ margin: "4px 0" }}>
                        {notificationContent(
                          notification
                        )}
                      </p>

                      <small style={{ opacity: 0.6 }}>
                        {new Date(
                          notification.created_at
                        ).toLocaleString()}
                      </small>
                    </div>

                    {!notification.is_read && (
                      <span
                        style={{
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background: "#7c3aed",
                        }}
                      />
                    )}
                  </button>
                ))
              )}
            </div>
          </section>
        ) : active === "Messages" ? (
          <section className="welcome">
            <h2>Private Messages 💬</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                gap: "20px",
                marginTop: "20px",
                minHeight: "500px",
              }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  padding: "15px",
                  background: "#fafafa",
                }}
              >
                <h3>Users</h3>

                {users.length === 0 ? (
                  <p>No other users yet.</p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {users.map((user) => (
                      <div
                        key={user.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px",
                          borderRadius: "10px",
                          background:
                            selectedChat?.id === user.id
                              ? "#e9d5ff"
                              : "white",
                        }}
                      >
                        <button
                          onClick={() => openChat(user)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flex: 1,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            textAlign: "left",
                            padding: 0,
                          }}
                        >
                          <div
                            className="avatar"
                            style={{
                              width: "42px",
                              height: "42px",
                              minWidth: "42px",
                            }}
                          >
                            {user.avatar_url ? (
                              <img
                                src={user.avatar_url}
                                alt="Avatar"
                                loading="lazy"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              user.full_name?.charAt(0) ||
                              "U"
                            )}
                          </div>

                          <div>
                            <strong>
                              {user.full_name ||
                                "NEXORA User"}
                            </strong>

                            <div
                              style={{
                                fontSize: "12px",
                                opacity: 0.7,
                              }}
                            >
                              @{user.username || "user"}
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() =>
                            toggleFollow(user.id)
                          }
                          style={{
                            border: "none",
                            borderRadius: "8px",
                            padding: "7px 10px",
                            background:
                              following[user.id]
                                ? "#e5e7eb"
                                : "#7c3aed",
                            color:
                              following[user.id]
                                ? "#111"
                                : "white",
                            cursor: "pointer",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {following[user.id]
                            ? t.following
                            : t.follow}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                {!selectedChat ? (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "30px",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "50px" }}>
                        💬
                      </div>

                      <h3>Select a user</h3>

                      <p>
                        Choose a user to start a private
                        conversation.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        padding: "15px",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        className="avatar"
                        style={{
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        {selectedChat.avatar_url ? (
                          <img
                            src={selectedChat.avatar_url}
                            alt="Avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          selectedChat.full_name?.charAt(
                            0
                          ) || "U"
                        )}
                      </div>

                      <div>
                        <strong>
                          {selectedChat.full_name ||
                            "NEXORA User"}
                        </strong>

                        <div
                          style={{
                            fontSize: "12px",
                            opacity: 0.7,
                          }}
                        >
                          @{selectedChat.username ||
                            "user"}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        padding: "15px",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        minHeight: "350px",
                      }}
                    >
                      {messagesLoading ? (
                        <p style={{ textAlign: "center" }}>
                          Loading messages...
                        </p>
                      ) : messages.length === 0 ? (
                        <p
                          style={{
                            textAlign: "center",
                            opacity: 0.6,
                            marginTop: "40px",
                          }}
                        >
                          No messages yet. Say hello 👋
                        </p>
                      ) : (
                        messages.map((message) => {
                          const mine =
                            message.sender_id ===
                            session.user.id;

                          return (
                            <div
                              key={message.id}
                              style={{
                                alignSelf: mine
                                  ? "flex-end"
                                  : "flex-start",
                                maxWidth: "75%",
                                background: mine
                                  ? "#7c3aed"
                                  : "#eeeeee",
                                color: mine
                                  ? "white"
                                  : "#111",
                                padding: "10px 14px",
                                borderRadius: "16px",
                                borderBottomRightRadius:
                                  mine ? "4px" : "16px",
                                borderBottomLeftRadius:
                                  mine ? "16px" : "4px",
                              }}
                            >
                              <div>{message.content}</div>

                              <small
                                style={{
                                  display: "block",
                                  marginTop: "5px",
                                  opacity: 0.7,
                                  fontSize: "10px",
                                }}
                              >
                                {new Date(
                                  message.created_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </small>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div
                      style={{
                        padding: "12px",
                        borderTop: "1px solid #ddd",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Write a message..."
                        value={messageText}
                        onChange={(e) =>
                          setMessageText(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: "12px",
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                        }}
                      />

                      <button
                        className="primary-btn"
                        onClick={sendMessage}
                        disabled={sendingMessage}
                      >
                        {sendingMessage ? "..." : t.send}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ) : showProfile ? (
          <section className="welcome">
            <h2>My Profile 👤</h2>

            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "15px",
                  fontSize: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ddd",
                }}
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={t.profile}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              <label
                style={{
                  display: "inline-block",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <span className="primary-btn">
                  Change Profile Photo
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={saving}
                  style={{ display: "none" }}
                />
              </label>

              <input
                type="text"
                placeholder="Full name"
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "500px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              />

              <input
                type="text"
                placeholder="Username"
                value={editUsername}
                onChange={(e) =>
                  setEditUsername(e.target.value)
                }
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "500px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              />

              <textarea
                placeholder="Bio"
                value={editBio}
                onChange={(e) =>
                  setEditBio(e.target.value)
                }
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "500px",
                  minHeight: "120px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              />

              <button
                className="primary-btn"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {saveMessage && <p>{saveMessage}</p>}
            </div>
          </section>
        ) : (
          <div className="fb-home-layout">
            <div className="fb-home-main">
              <div className="fb-mobile-page-title">
                <strong>NEXORA</strong>
                <span>Home</span>
              </div>
            <section className="fb-home-card">
              <div className="fb-create-head">
                <div className="fb-avatar">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="You" loading="lazy" />
                  ) : (
                    avatarLetter
                  )}
                </div>
                <button
                  className="fb-composer-input"
                  onClick={() => document.getElementById("nexora-post-box")?.focus()}
                >
                  {`What's on your mind, ${profile?.full_name || "NEXORA user"}?`}
                </button>
              </div>

              <div className="fb-composer-actions">
                <label className="fb-action" title="Photo / Video">
                  <span className="fb-action-icon photo"><NIcon name="Image" size={20} /></span>
                  <span>Photo / Video</span>
                  <input type="file" accept="image/*,video/*" onChange={handleMediaSelect} hidden />
                </label>
                <label className="fb-action" title="Story">
                  <span className="fb-action-icon story"><NIcon name="Plus" size={20} /></span>
                  <span>Story</span>
                  <input type="file" accept="image/*,video/*" onChange={handleStorySelect} hidden />
                </label>
                <button className="fb-action" onClick={() => document.getElementById("nexora-post-box")?.focus()}>
                  <span className="fb-action-icon feeling"><NIcon name="Smile" size={20} /></span>
                  <span>Feeling / Activity</span>
                </button>
              </div>

              <textarea
                id="nexora-post-box"
                className="fb-post-textarea"
                placeholder="What's on your mind?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />

              {selectedMedia && (
                <div className="fb-media-preview">
                  {selectedMedia.type.startsWith("video/") ? (
                    <video src={mediaPreview} controls preload="metadata" />
                  ) : (
                    <img src={mediaPreview} alt="Preview" />
                  )}
                  <button onClick={removeSelectedMedia}>Remove</button>
                </div>
              )}

              <button className="fb-publish" onClick={createPost} disabled={posting || uploading}>
                {uploading ? "Uploading..." : posting ? "Publishing..." : "Post"}
              </button>
            </section>

            <section className="fb-home-card fb-stories-card">
              <div className="fb-section-title">
                <div>
                  <h3>Stories</h3>
                  <span>Share moments with your friends</span>
                </div>
                <NIcon name="ChevronRight" size={20} />
              </div>

              <div className="fb-stories-row">
                <label className="fb-story create-story">
                  <div className="fb-story-bg create-story-bg">
                    <div className="story-plus"><NIcon name="Plus" size={22} /></div>
                  </div>
                  <strong>Create story</strong>
                  <input type="file" accept="image/*,video/*" onChange={handleStorySelect} hidden />
                </label>

                {stories.map((story) => (
                  <button key={story.id} className="fb-story" onClick={() => setSelectedStory(story)}>
                    <div className="fb-story-bg">
                      {story.media_type === "video" ? (
                        <video src={story.media_url} muted preload="none" />
                      ) : (
                        <img src={story.media_url} alt="Story" loading="lazy" />
                      )}
                      <div className="fb-story-avatar">
                        {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : avatarLetter}
                      </div>
                    </div>
                    <strong>{profile?.full_name || "NEXORA"}</strong>
                  </button>
                ))}
              </div>

              {selectedStory && !selectedStory.id && (
                <div className="fb-story-preview">
                  <h4>Story Preview</h4>
                  {selectedStory.type.startsWith("video/") ? (
                    <video src={storyPreview} controls />
                  ) : (
                    <img src={storyPreview} alt="Story Preview" />
                  )}
                  <div className="fb-preview-actions">
                    <button className="fb-publish" onClick={createStory} disabled={storyUploading}>
                      {storyUploading ? "Uploading..." : "Publish Story"}
                    </button>
                    <button onClick={removeSelectedStory}>Remove</button>
                  </div>
                </div>
              )}
            </section>

            <section className="fb-feed-heading">
              <div>
                <h2>Latest Posts</h2>
                <p>See what's happening on NEXORA</p>
              </div>
              <button><NIcon name="Sliders" size={18} /> Filter</button>
            </section>

            <section className="feed">
              {posts.length === 0 ? (
                <article className="post">
                  <p>
                    No posts yet. Create the first one 🚀
                  </p>
                </article>
              ) : (
                posts.map((post) => {
                  const postLike = likes[post.id] || {
                    count: 0,
                    likedByMe: false,
                  };

                  const postComments =
                    comments[post.id] || [];

                  const postOwner =
                    postProfiles[post.user_id];

                  const postOwnerName =
                    postOwner?.full_name ||
                    postOwner?.username ||
                    (post.user_id === session.user.id
                      ? profile?.full_name ||
                        profile?.username
                      : "NEXORA User");

                  const postOwnerUsername =
                    postOwner?.username ||
                    (post.user_id === session.user.id
                      ? profile?.username
                      : "user");

                  const postOwnerAvatar =
                    postOwner?.avatar_url ||
                    (post.user_id === session.user.id
                      ? profile?.avatar_url
                      : "");

                  const postOwnerLetter =
                    postOwnerName
                      ?.charAt(0)
                      ?.toUpperCase() || "U";

                  return (
                    <article
                      className="post"
                      id={`post-${post.id}`}
                      key={post.id}
                    >
                      <div className="post-header">
                        <div className="avatar">
                          {postOwnerAvatar ? (
                            <img
                              src={postOwnerAvatar}
                              alt="Avatar"
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            postOwnerLetter
                          )}
                        </div>

                        <div>
                          <strong>
                            {postOwnerName} ✓
                          </strong>

                          <span>
                            @{postOwnerUsername || "user"} ·{" "}
                            {new Date(
                              post.created_at
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {post.content && <p>{post.content}</p>}

                      {post.media_url &&
                        post.media_type === "image" && (
                          <img
                            src={post.media_url}
                            alt="Post media"
                            loading="lazy"
                            decoding="async"
                            style={{
                              width: "100%",
                              maxHeight: "600px",
                              objectFit: "contain",
                              borderRadius: "12px",
                              marginTop: "10px",
                            }}
                          />
                        )}

                      {post.media_url &&
                        post.media_type === "video" && (
                          <video
                            src={post.media_url}
                            controls
                            preload="none"
                            style={{
                              width: "100%",
                              maxHeight: "600px",
                              borderRadius: "12px",
                              marginTop: "10px",
                            }}
                          />
                        )}

                      <div className="post-actions">
                        <button
                          onClick={() =>
                            toggleLike(post.id)
                          }
                          style={{
                            color: postLike.likedByMe
                              ? "red"
                              : "inherit",
                            fontWeight:
                              postLike.likedByMe
                                ? "bold"
                                : "normal",
                          }}
                        >
                          {postLike.likedByMe
                            ? "❤️ Liked"
                            : "♡ Like"}{" "}
                          {postLike.count > 0 &&
                            `(${postLike.count})`}
                        </button>

                        <button
                          onClick={() => {
                            const box =
                              document.getElementById(
                                `comment-${post.id}`
                              );

                            if (box) box.focus();
                          }}
                        >
                          💬 Comment{" "}
                          {postComments.length > 0 &&
                            `(${postComments.length})`}
                        </button>

                        <button>↗ Share</button>
                      </div>

                      <div style={{ marginTop: "15px" }}>
                        {postComments.map((comment) => {
                          const commentOwner =
                            commentProfiles[
                              comment.user_id
                            ];

                          const commentOwnerName =
                            commentOwner?.full_name ||
                            commentOwner?.username ||
                            (comment.user_id ===
                            session.user.id
                              ? profile?.full_name ||
                                profile?.username ||
                                "You"
                              : "NEXORA User");

                          const commentOwnerUsername =
                            commentOwner?.username ||
                            (comment.user_id ===
                            session.user.id
                              ? profile?.username
                              : "user");

                          return (
                            <div
                              key={comment.id}
                              style={{
                                padding: "10px",
                                marginBottom: "8px",
                                borderRadius: "10px",
                                background: "#f3f3f3",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <div
                                  className="avatar"
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    minWidth: "32px",
                                  }}
                                >
                                  {commentOwner?.avatar_url ? (
                                    <img
                                      src={
                                        commentOwner.avatar_url
                                      }
                                      alt="Avatar"
                                      loading="lazy"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  ) : (
                                    commentOwnerName
                                      ?.charAt(0)
                                      ?.toUpperCase() || "U"
                                  )}
                                </div>

                                <div>
                                  <strong>
                                    {commentOwnerName}
                                  </strong>

                                  <div
                                    style={{
                                      fontSize: "11px",
                                      opacity: 0.65,
                                    }}
                                  >
                                    @
                                    {commentOwnerUsername ||
                                      "user"}
                                  </div>
                                </div>
                              </div>

                              <p
                                style={{
                                  margin: "8px 0 5px",
                                }}
                              >
                                {comment.content}
                              </p>

                              {comment.user_id ===
                                session.user.id && (
                                <button
                                  onClick={() =>
                                    deleteComment(
                                      comment.id
                                    )
                                  }
                                  style={{
                                    border: "none",
                                    background:
                                      "transparent",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          );
                        })}

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "10px",
                          }}
                        >
                          <input
                            id={`comment-${post.id}`}
                            type="text"
                            placeholder="Write a comment..."
                            value={
                              commentText[post.id] || ""
                            }
                            onChange={(e) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [post.id]:
                                  e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                createComment(post.id);
                              }
                            }}
                            style={{
                              flex: 1,
                              padding: "10px",
                              borderRadius: "8px",
                              border:
                                "1px solid #ccc",
                            }}
                          />

                          <button
                            className="primary-btn"
                            onClick={() =>
                              createComment(post.id)
                            }
                            disabled={
                              commenting[post.id]
                            }
                          >
                            {commenting[post.id]
                              ? "..."
                              : t.send}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </section>
              </div>

              <aside className="fb-home-right">
                <div className="fb-right-card fb-profile-shortcut">
                  <div className="fb-right-title">Your profile</div>
                  <button className="fb-right-profile" onClick={() => { setActive("Profile"); setShowProfile(true); }}>
                    <div className="fb-right-avatar">
                      {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : avatarLetter}
                    </div>
                    <div>
                      <strong>{profile?.full_name || "NEXORA User"} {profile?.is_owner && (<span title="NEXORA Owner" style={{marginLeft:"6px",padding:"2px 6px",borderRadius:"999px",background:"linear-gradient(135deg,#f59e0b,#facc15,#d97706)",color:"#fff",fontSize:"10px",fontWeight:"800",boxShadow:"0 1px 5px rgba(245,158,11,.4)",verticalAlign:"middle"}}>👑 OWNER</span>)}</strong>
                      <span>@{profile?.username || "user"}</span>
                    </div>
                  </button>
                </div>

                <div className="fb-right-card">
                  <div className="fb-right-title-row">
                    <strong>Contacts</strong>
                    <button onClick={() => { setActive("Messages"); setShowProfile(false); loadUsers(); }} title={t.message}><NIcon name="Message" size={17} /></button>
                  </div>
                  <div className="fb-contacts">
                    {users.length === 0 ? (
                      <div className="fb-no-contacts">No contacts yet</div>
                    ) : (
                      users.slice(0, 8).map((user) => (
                        <button key={user.id} className="fb-contact" onClick={() => openChat(user)}>
                          <span className="fb-contact-avatar">
                            {user.avatar_url ? <img src={user.avatar_url} alt="" /> : (user.full_name?.charAt(0)?.toUpperCase() || "U")}
                            <i />
                          </span>
                          <span>{user.full_name || user.username || "NEXORA User"}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="fb-right-card fb-shortcuts">
                  <div className="fb-right-title">Your shortcuts</div>{profile?.is_owner && (<button onClick={() => setActive("Developer")}><span className="shortcut-icon">👑</span>Developer Control Panel</button>)}
                  <button onClick={() => setActive("Explore")}><span className="shortcut-icon"><NIcon name="Explore" size={17} /></span>Explore people</button>
                  <button onClick={() => openNotifications()}><span className="shortcut-icon"><NIcon name="Notifications" size={17} /></span>Notifications</button>
                  <button onClick={() => { setActive("Messages"); setShowProfile(false); loadUsers(); }}><span className="shortcut-icon"><NIcon name="Messages" size={17} /></span>Messages</button>
                </div>

                <div className="fb-right-footer">NEXORA · Privacy · Terms · Help · © 2026</div>
              </aside>
            </div>
        )}

        {selectedStory && selectedStory.id && (
          <div
            onClick={() => setSelectedStory(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "600px",
                width: "100%",
                maxHeight: "90vh",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => setSelectedStory(null)}
                style={{
                  position: "absolute",
                  top: "-45px",
                  right: "0",
                  color: "white",
                  background: "transparent",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              {selectedStory.media_type === "video" ? (
                <video
                  src={selectedStory.media_url}
                  controls
                  autoPlay
                  preload="metadata"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    borderRadius: "12px",
                  }}
                />
              ) : (
                <img
                  src={selectedStory.media_url}
                  alt="Story"
                  decoding="async"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    borderRadius: "12px",
                    objectFit: "contain",
                  }}
                />
              )}

              {selectedStory.user_id ===
                session.user.id && (
                <button
                  onClick={() =>
                    deleteStory(selectedStory.id)
                  }
                  style={{
                    display: "block",
                    margin: "15px auto 0",
                    color: "white",
                    background: "red",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete Story
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;