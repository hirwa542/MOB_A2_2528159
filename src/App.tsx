import React, { useEffect, useState } from 'react';
import {
  Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View, Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

const STORAGE_KEY = '@hirwa_portfolio_profile_v1';
const C = { navy: '#10243A', blue: '#167D8D', pale: '#F4F7FA', white: '#FFFFFF', ink: '#1E2D3D', muted: '#647487', line: '#DFE7ED', green: '#167D58', red: '#B42318', softBlue: '#E3F4F5', lilac: '#F0ECFF', gold: '#F0B45B', deep: '#0A1828' };

type Profile = { headline: string; bio: string; primarySkill: string; available: boolean; imageUri: string | null };
type Project = { id: string; title: string; problem: string; contribution: string; technology: string; technologyTags: string[]; status: string };
type RootStackParamList = { MainTabs: undefined };
type ProjectsStackParamList = { ProjectsList: undefined; ProjectDetails: { project: Project } };
type TabParamList = { Home: undefined; Skills: undefined; Projects: undefined; Editor: undefined; About: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();
const ProjectStack = createNativeStackNavigator<ProjectsStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const DEFAULT_PROFILE: Profile = {
  headline: 'Aspiring Software Developer | Web Development & AI Enthusiast',
  bio: 'I am a Computer Science student at INES-Ruhengeri who enjoys turning ideas into simple websites. I have worked on Agri Market and Mwiza Kids Wear, and I am continuing to improve my web development skills. I also use AI tools to support my work, then review and edit the results.',
  primarySkill: 'HTML',
  available: false,
  imageUri: null
};
const projects: Project[] = [
  { id: 'agri-market', title: 'Agri Market', problem: 'A website idea that brings different farm products together in one place. Customers can explore products such as vegetables, juice, fresh meat, chickens and rabbits. The idea is to make it easier to order from farmers and arrange delivery.', contribution: 'I came up with the idea and made the first simple prototype. I used AI to help me develop the website further, then checked the generated code and changed or removed parts that did not fit my idea. I also worked on connecting the site to MySQL. I am still responsible for checking that each feature works as expected.', technology: 'HTML, CSS, JavaScript and MySQL are used in this project. I have confirmed that MySQL is connected.', technologyTags: ['HTML', 'CSS', 'JavaScript', 'MySQL'], status: 'Working website' },
  { id: 'mwiza-kids-wear', title: 'Mwiza Kids Wear', problem: 'A prototype for my children’s clothing business idea. I want customers to browse clothes, add items to a cart, arrange delivery, or find the shop and visit in person.', contribution: 'This is my idea for a children’s clothing shop. I created a simple prototype and used AI to help me build it out. After that, I reviewed the code and edited parts to better match what I wanted for the shop. The MySQL database connection is still planned work.', technology: 'HTML, CSS and JavaScript. MySQL is planned but is not connected yet.', technologyTags: ['HTML', 'CSS', 'JavaScript'], status: 'Prototype' }
];

function Page({ children }: { children: React.ReactNode }) {
  return <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>;
}
function Heading({ children }: { children: React.ReactNode }) { return <Text style={styles.heading}>{children}</Text>; }
function Subheading({ children }: { children: React.ReactNode }) { return <Text style={styles.subheading}>{children}</Text>; }
function Card({ children }: { children: React.ReactNode }) { return <View style={styles.card}>{children}</View>; }
function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return <TouchableOpacity accessibilityRole="button" style={styles.primaryButton} onPress={onPress}><Text style={styles.primaryButtonText}>{title}</Text></TouchableOpacity>;
}
function SecondaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return <TouchableOpacity accessibilityRole="button" style={styles.secondaryButton} onPress={onPress}><Text style={styles.secondaryButtonText}>{title}</Text></TouchableOpacity>;
}
function Field({ label, value, onChangeText, placeholder, multiline = false }: {
  label: string; value: string; onChangeText: (s: string) => void; placeholder: string; multiline?: boolean;
}) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput
    accessibilityLabel={label} value={value} onChangeText={onChangeText} placeholder={placeholder}
    placeholderTextColor="#8290A3" multiline={multiline} textAlignVertical={multiline ? 'top' : 'center'}
    style={[styles.input, multiline && styles.multiline]} /></View>;
}
function HomeScreen({ profile }: { profile: Profile }) {
  return <Page>
    <View style={styles.homeTopline}><View><Text style={styles.appKicker}>HIRWA PORTFOLIO</Text><Text style={styles.appGreeting}>My developer portfolio</Text></View><View style={styles.onlineDot}><View style={styles.dot} /><Text style={styles.onlineText}>PORTFOLIO</Text></View></View>
    <View style={styles.hero}>
      <View style={styles.heroAccent} />
      <View style={styles.heroProfileRow}>
        {profile.imageUri ? <Image source={{ uri: profile.imageUri }} style={styles.avatar} /> :
          <View style={styles.avatarPlaceholder}><Text style={styles.avatarLetters}>HH</Text></View>}
        <View style={styles.heroIdentity}><Text style={styles.eyebrow}>COMPUTER SCIENCE STUDENT</Text><Text style={styles.nameSentence}>My name is Hirwa Honorine.</Text><Text style={styles.heroSchool}>INES-Ruhengeri · Software Engineering</Text></View>
      </View>
      <View style={styles.heroDivider} />
      <Text style={styles.heroHeadline}>{profile.headline}</Text>
      <Text style={styles.heroBio}>{profile.bio}</Text>
      <View style={styles.heroBottomRow}><View style={styles.codePill}><Text style={styles.codeText}>MOB-A2-8159</Text></View><View style={styles.availabilityPill}><View style={[styles.dot, { backgroundColor: profile.available ? '#7FE0B6' : '#F0B45B' }]} /><Text style={styles.availabilityText}>{profile.available ? 'Open to opportunities' : 'Learning & building'}</Text></View></View>
    </View>
    <View style={styles.sectionTitleRow}><Heading>A little about me</Heading><Text style={styles.sectionHint}>01 / INTRO</Text></View>
    <Card><Text style={styles.body}>I enjoy turning ideas into practical digital experiences. I learn by building websites, testing what works, and improving my code step by step.</Text><View style={styles.chipRow}><View style={styles.lightChip}><Text style={styles.lightChipText}>Curious learner</Text></View><View style={styles.lightChip}><Text style={styles.lightChipText}>Practical projects</Text></View><View style={styles.lightChip}><Text style={styles.lightChipText}>AI-assisted workflow</Text></View></View></Card>
    <View style={styles.sectionTitleRow}><Heading>My journey so far</Heading><Text style={styles.sectionHint}>02 / SNAPSHOT</Text></View>
    <View style={styles.statsRow}><View style={styles.statCard}><Text style={styles.statNumber}>02</Text><Text style={styles.statLabel}>Personal projects</Text></View><View style={styles.statCard}><Text style={styles.statNumber}>05</Text><Text style={styles.statLabel}>Skills in focus</Text></View><View style={styles.statCard}><Text style={styles.statNumber}>01</Text><Text style={styles.statLabel}>Goal: keep growing</Text></View></View>
    <View style={styles.focusCard}><View style={styles.focusIcon}><Text style={styles.focusIconText}>✦</Text></View><View style={styles.focusCopy}><Text style={styles.focusTitle}>Current focus · {profile.primarySkill}</Text><Text style={styles.focusDescription}>Building a stronger foundation through hands-on practice and real project ideas.</Text></View></View>
    <Text style={styles.note}>This portfolio is an honest snapshot of what I have worked on and what I am still learning.</Text>
  </Page>;
}
function SkillsScreen() {
  const skills = [
    ['HTML', 'Used to structure web pages in my website projects.'],
    ['CSS', 'Used to style website pages and layouts.'],
    ['JavaScript', 'Used in my website projects to add behaviour and interaction.'],
    ['MySQL', 'Used with Agri Market. MySQL is planned for Mwiza Kids Wear but is not yet connected there.'],
    ['Basic Website Prototyping', 'I sketch out website ideas, make simple prototypes, and improve them by testing, reviewing code, and making edits.']
  ];  return <Page><Heading>Skills & education</Heading><Text style={styles.body}>These are the tools I have used in my website projects and the areas I am practising. I am still learning and improving through hands-on work.</Text>
    {skills.map(([name, desc]) => <Card key={name}><Text style={styles.cardTitle}>{name}</Text><Text style={styles.body}>{desc}</Text></Card>)}
    <Heading>Education timeline</Heading>
    <Card><Text style={styles.cardTitle}>Computer Science / Software Engineering</Text><Text style={styles.body}>INES-Ruhengeri</Text><Text style={styles.muted}>I am currently studying at INES-Ruhengeri. I am building my knowledge through coursework and practical projects.</Text></Card>
  </Page>;
}
function ProjectsScreen({ navigation }: NativeStackScreenProps<ProjectsStackParamList, 'ProjectsList'>) {
  return <Page>
    <View style={styles.projectsHero}><Text style={styles.eyebrow}>SELECTED WORK · 2026</Text><Text style={styles.projectsTitle}>Ideas into{ '\n' }working projects.</Text><Text style={styles.projectsIntro}>A collection of ideas I have shaped into website prototypes and practical learning experiences.</Text><View style={styles.projectsCount}><Text style={styles.projectsCountText}>02 PROJECTS  ·  WEB DEVELOPMENT</Text></View></View>
    {projects.map((p, index) => <Card key={p.id}>
      <View style={styles.projectTopRow}><View style={[styles.projectNumber, index === 1 && styles.projectNumberAlt]}><Text style={styles.projectNumberText}>0{index + 1}</Text></View><View style={[styles.projectStatus, index === 1 && styles.prototypeStatus]}><Text style={[styles.projectStatusText, index === 1 && styles.prototypeStatusText]}>{p.status}</Text></View></View>
      <Text style={styles.cardTitle}>{p.title}</Text><Text style={styles.body}>{p.problem}</Text>
      <View style={styles.tagRow}>{p.technologyTags.map(t => <View key={t} style={styles.techTag}><Text style={styles.techTagText}>{t}</Text></View>)}</View>
      <View style={styles.projectCardFooter}><Text style={styles.projectFooterLabel}>PERSONAL PROJECT</Text><TouchableOpacity accessibilityRole="button" style={styles.projectLink} onPress={() => navigation.navigate('ProjectDetails', { project: p })}><Text style={styles.projectLinkText}>Explore project  ↗</Text></TouchableOpacity></View>
    </Card>)}
    <Text style={styles.note}>I am continuing to test and improve these projects as I learn.</Text>
  </Page>;
}
function ProjectDetailsScreen({ route }: NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetails'>) {
  const { project } = route.params;
  return <Page><View style={styles.pageIntro}><Text style={styles.eyebrowLight}>PROJECT NOTES</Text><Heading>{project.title}</Heading><Text style={styles.muted}>{project.status}</Text></View>
    <Card><Subheading>The idea</Subheading><Text style={styles.body}>{project.problem}</Text></Card>
    <Card><Subheading>What I worked on</Subheading><Text style={styles.body}>{project.contribution}</Text></Card>
    <Card><Subheading>Tools I used</Subheading><Text style={styles.body}>{project.technology}</Text></Card>
    <Text style={styles.note}>I describe my work honestly, including what is still in progress.</Text>
  </Page>;
}
function EditorScreen({ profile, setProfile }: { profile: Profile; setProfile: (p: Profile) => void }) {
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [skill, setSkill] = useState(profile.primarySkill);
  const [available, setAvailable] = useState(profile.available);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState('');
  useEffect(() => { setHeadline(profile.headline); setBio(profile.bio); setSkill(profile.primarySkill); setAvailable(profile.available); }, [profile]);
  const save = () => {
    const next: Record<string, string> = {};
    if (headline.trim().length < 5) next.headline = 'Headline must contain at least 5 characters.';
    if (bio.trim().length < 20) next.bio = 'Biography must contain at least 20 characters.';
    if (skill.trim().length < 2) next.skill = 'Enter a primary skill with at least 2 characters.';
    setErrors(next);
    if (Object.keys(next).length) { setFeedback('Please correct the fields marked below.'); return; }
    setProfile({ ...profile, headline: headline.trim(), bio: bio.trim(), primarySkill: skill.trim(), available });
    setFeedback('Profile saved on this device.');
  };
  const pickImage = async (mode: 'camera' | 'library') => {
    try {
      let result: ImagePicker.ImagePickerResult;
      if (mode === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) { setFeedback('Camera permission was not granted. You can use the gallery instead.'); return; }
        result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) { setFeedback('Gallery permission was not granted. You can try again or use the camera.'); return; }
        result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
      }
      if (result.canceled) { setFeedback('Image selection cancelled. Your current profile image was not changed.'); return; }
      setProfile({ ...profile, imageUri: result.assets[0].uri });
      setFeedback('Your profile photo has been updated.');
    } catch { setFeedback('Could not open the image tool. Please try again.'); }
  };
  const removeImage = () => { setProfile({ ...profile, imageUri: null }); setFeedback('Your profile photo has been removed.'); };
  const resetProfile = () => {
    Alert.alert('Reset my profile?', 'This will restore the original portfolio text and remove the saved profile photo.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset profile', style: 'destructive', onPress: () => {
        setProfile(DEFAULT_PROFILE);
        setHeadline(DEFAULT_PROFILE.headline); setBio(DEFAULT_PROFILE.bio); setSkill(DEFAULT_PROFILE.primarySkill); setAvailable(DEFAULT_PROFILE.available);
        setErrors({}); setFeedback('My profile has been reset to its original details.');
      } }
    ]);
  };
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
    <Page><View style={styles.pageIntro}><Text style={styles.eyebrowLight}>MAKE IT YOURS</Text><Heading>Edit my portfolio</Heading><Text style={styles.body}>I can update the details people see about me here. Changes are saved on this phone.</Text></View>
      <Field label="My headline" value={headline} onChangeText={setHeadline} placeholder="Aspiring Software Developer..." />
      {!!errors.headline && <Text style={styles.error}>{errors.headline}</Text>}
      <Field label="A little about me" value={bio} onChangeText={setBio} placeholder="Write a few sentences about yourself" multiline />
      {!!errors.bio && <Text style={styles.error}>{errors.bio}</Text>}
      <Field label="Skill I want to highlight" value={skill} onChangeText={setSkill} placeholder="e.g. HTML" />
      {!!errors.skill && <Text style={styles.error}>{errors.skill}</Text>}
      <View style={styles.switchRow}><Text style={styles.label}>Mark me as available for opportunities</Text><Switch value={available} onValueChange={setAvailable} accessibilityLabel="Available for opportunities" /></View>
      <Heading>My photo</Heading>
      {profile.imageUri ? <Image source={{ uri: profile.imageUri }} style={styles.preview} /> : <View style={styles.emptyImage}><Text style={styles.muted}>I have not added a photo yet</Text></View>}
      <SecondaryButton title="Take a photo" onPress={() => void pickImage('camera')} />
      <SecondaryButton title="Choose a photo from my phone" onPress={() => void pickImage('library')} />
      {profile.imageUri && <SecondaryButton title="Remove image" onPress={removeImage} />}
      {!!feedback && <Text accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</Text>}
      <PrimaryButton title="Save my changes" onPress={save} />
      <SecondaryButton title="Reset my profile" onPress={resetProfile} />
    </Page>
  </KeyboardAvoidingView>;
}
function AboutScreen() {
  return <Page><View style={styles.pageIntro}><Text style={styles.eyebrowLight}>A LITTLE MORE ABOUT THIS APP</Text><Heading>About me & my app</Heading><Text style={styles.body}>I made this portfolio to introduce myself, share the projects I am working on, and keep track of my progress.</Text></View>
    <Card><Text style={styles.label}>App name</Text><Text style={styles.cardTitle}>HirwaPortfolio</Text>
      <Text style={styles.label}>Student</Text><Text style={styles.body}>Hirwa Honorine</Text>
      <Text style={styles.label}>Registration number</Text><Text style={styles.body}>25/28159</Text>
      <Text style={styles.label}>Verification code</Text><Text style={styles.cardTitle}>MOB-A2-8159</Text>
      <Text style={styles.label}>Version</Text><Text style={styles.body}>1.0.0</Text>
      <Text style={styles.label}>Data use</Text><Text style={styles.body}>The profile details I save are kept on this device. This app does not send them to a server. I should avoid adding private information.</Text>
    </Card>
    <Text style={styles.note}>The main portfolio screens are designed to work offline.</Text>
  </Page>;
}
function ProjectsNavigator() {
  return <ProjectStack.Navigator screenOptions={{ headerStyle: { backgroundColor: C.navy }, headerTintColor: C.white, headerTitleStyle: { fontWeight: '700' } }}>
    <ProjectStack.Screen name="ProjectsList" component={ProjectsScreen} options={{ headerShown: false }} />
    <ProjectStack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project Details' }} />
  </ProjectStack.Navigator>;
}
function MainTabs({ profile, setProfile }: { profile: Profile; setProfile: (p: Profile) => void }) {
  const tabSymbols: Record<keyof TabParamList, string> = { Home: '⌂', Skills: '◇', Projects: '▤', Editor: '✎', About: 'ⓘ' };
  return <Tabs.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: C.blue, tabBarInactiveTintColor: '#8794A3', tabBarStyle: { height: 78, paddingBottom: 10, paddingTop: 8, paddingHorizontal: 5, backgroundColor: C.white, borderTopColor: C.line, borderTopWidth: 1, elevation: 12 }, tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 1 }, tabBarIcon: ({ focused, color }) => <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}><Text style={[styles.tabSymbol, { color }]}>{tabSymbols[route.name as keyof TabParamList]}</Text></View> })}>
    <Tabs.Screen name="Home" options={{ tabBarLabel: 'Home' }}>{() => <HomeScreen profile={profile} />}</Tabs.Screen>
    <Tabs.Screen name="Skills" component={SkillsScreen} options={{ tabBarLabel: 'Skills' }} />
    <Tabs.Screen name="Projects" component={ProjectsNavigator} options={{ tabBarLabel: 'Projects' }} />
    <Tabs.Screen name="Editor" options={{ tabBarLabel: 'Edit profile' }}>{() => <EditorScreen profile={profile} setProfile={setProfile} />}</Tabs.Screen>
    <Tabs.Screen name="About" component={AboutScreen} options={{ tabBarLabel: 'About' }} />
  </Tabs.Navigator>;
}
export default function App() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(saved) });
      } catch { Alert.alert('Profile loading issue', 'Saved profile could not be loaded. You can continue and save again.'); }
      finally { setLoaded(true); }
    })();
  }, []);
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile)).catch(() => Alert.alert('Save issue', 'Could not persist profile data on this device.'));
  }, [profile, loaded]);
  return <NavigationContainer><StatusBar style="light" backgroundColor={C.navy} /><Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: C.navy }, headerTintColor: C.white, headerTitleStyle: { fontWeight: '700' } }}>
    <Stack.Screen name="MainTabs" options={{ title: 'HirwaPortfolio', headerShown: false }}>{() => <MainTabs profile={profile} setProfile={setProfile} />}</Stack.Screen>
  </Stack.Navigator></NavigationContainer>;
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.pale }, content: { padding: 18, paddingTop: 15, paddingBottom: 36, gap: 15 },
  pageIntro: { backgroundColor: C.white, borderRadius: 20, borderWidth: 1, borderColor: C.line, padding: 18, gap: 8, marginBottom: 2 },
  eyebrowLight: { color: C.blue, fontSize: 10, letterSpacing: 1.6, fontWeight: '900' },
  projectTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  projectNumber: { width: 42, height: 42, borderRadius: 14, backgroundColor: C.softBlue, alignItems: 'center', justifyContent: 'center' },
  projectNumberAlt: { backgroundColor: C.lilac },
  projectNumberText: { color: C.navy, fontSize: 15, fontWeight: '900' },
  projectStatus: { borderRadius: 20, backgroundColor: '#E3F5EE', paddingHorizontal: 10, paddingVertical: 6 },
  projectStatusText: { color: C.green, fontSize: 11, fontWeight: '800' },
  prototypeStatus: { backgroundColor: '#FFF3DF' }, prototypeStatusText: { color: '#9A6417' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 2 },
  techTag: { backgroundColor: C.pale, borderColor: C.line, borderWidth: 1, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 5 },
  techTagText: { color: C.muted, fontSize: 11, fontWeight: '700' },
  hero: { backgroundColor: C.navy, borderRadius: 25, padding: 20, gap: 14, overflow: 'hidden', shadowColor: C.navy, shadowOpacity: 0.16, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 5 },
  heroAccent: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: '#1B455A', right: -55, top: -70 },
  heroProfileRow: { flexDirection: 'row', alignItems: 'center', gap: 13 }, heroIdentity: { flex: 1, gap: 4 },
  avatar: { width: 72, height: 72, borderRadius: 23, borderWidth: 2, borderColor: '#77C6C7' },
  avatarPlaceholder: { width: 72, height: 72, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDF3F2', borderWidth: 2, borderColor: '#77C6C7' },
  avatarLetters: { color: C.navy, fontSize: 24, fontWeight: '900' },
  eyebrow: { color: '#83D2D0', fontSize: 10, letterSpacing: 1.2, fontWeight: '900' },
  nameSentence: { color: C.white, fontSize: 21, fontWeight: '900', lineHeight: 27 },
  heroSchool: { color: '#B8C8D8', fontSize: 11, lineHeight: 16 },
  heroDivider: { height: 1, backgroundColor: '#345067', marginVertical: 1 },
  heroHeadline: { color: C.white, fontSize: 16, fontWeight: '800', lineHeight: 23 },
  heroBio: { color: '#D8E3EC', fontSize: 13, lineHeight: 20 },
  heroBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  codePill: { borderRadius: 10, backgroundColor: '#203B52', paddingHorizontal: 11, paddingVertical: 8, borderWidth: 1, borderColor: '#36556C' },
  codeText: { color: C.white, fontWeight: '800', fontSize: 10, letterSpacing: 1 },
  availabilityPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1A354B', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 }, availabilityText: { color: '#E1EAF0', fontSize: 10, fontWeight: '700' },
  homeTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }, appKicker: { color: C.blue, fontSize: 10, fontWeight: '900', letterSpacing: 2 }, appGreeting: { color: C.navy, fontSize: 21, fontWeight: '900', marginTop: 4 }, onlineDot: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 7 }, onlineText: { color: C.muted, fontSize: 9, fontWeight: '900', letterSpacing: .6 }, dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#29A477' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }, sectionHint: { color: '#8B98A7', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 3 }, lightChip: { backgroundColor: '#EAF5F5', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 9 }, lightChipText: { color: '#216A73', fontSize: 10, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: 9 }, statCard: { flex: 1, backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 12, gap: 4 }, statNumber: { color: C.blue, fontSize: 24, fontWeight: '900' }, statLabel: { color: C.muted, fontSize: 10, lineHeight: 14, fontWeight: '700' },
  focusCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#E7F4F4', borderColor: '#CBE7E7', borderWidth: 1, borderRadius: 18, padding: 14 }, focusIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' }, focusIconText: { color: C.white, fontSize: 20, fontWeight: '900' }, focusCopy: { flex: 1, gap: 3 }, focusTitle: { color: C.navy, fontSize: 13, fontWeight: '900' }, focusDescription: { color: C.muted, fontSize: 12, lineHeight: 17 },
  appUnused: { color: C.navy },
  projectsHero: { backgroundColor: C.navy, borderRadius: 24, padding: 22, gap: 12, overflow: 'hidden' }, projectsTitle: { color: C.white, fontSize: 30, lineHeight: 36, fontWeight: '900', letterSpacing: -.5 }, projectsIntro: { color: '#D8E3EC', fontSize: 13, lineHeight: 20 }, projectsCount: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#456175', backgroundColor: '#203B52', borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8, marginTop: 2 }, projectsCountText: { color: '#A8DAD9', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  projectCardFooter: { borderTopWidth: 1, borderTopColor: C.line, paddingTop: 12, marginTop: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, projectFooterLabel: { color: '#8391A1', fontSize: 9, fontWeight: '900', letterSpacing: .7 }, projectLink: { backgroundColor: C.blue, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 }, projectLinkText: { color: C.white, fontSize: 11, fontWeight: '900' },
  tabIconWrap: { width: 32, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }, tabIconWrapActive: { backgroundColor: '#E3F4F5' }, tabSymbol: { fontSize: 21, fontWeight: '700', lineHeight: 24 },
  heading: { color: C.navy, fontSize: 22, lineHeight: 29, fontWeight: '800', marginTop: 3 },
  subheading: { color: C.navy, fontSize: 15, fontWeight: '800', marginBottom: 5 },
  card: { backgroundColor: C.white, borderRadius: 20, borderWidth: 1, borderColor: C.line, padding: 17, gap: 10, shadowColor: '#1B3154', shadowOpacity: 0.035, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  cardTitle: { color: C.ink, fontSize: 17, fontWeight: '800', lineHeight: 24 },
  body: { color: C.ink, fontSize: 14, lineHeight: 22 },
  muted: { color: C.muted, fontSize: 13, lineHeight: 20 },
  label: { color: C.navy, fontSize: 13, fontWeight: '700' },
  field: { gap: 6, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: C.line, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, color: C.ink, backgroundColor: C.white, fontSize: 15, minHeight: 48 },
  multiline: { minHeight: 105, paddingTop: 12 },
  primaryButton: { backgroundColor: C.blue, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14, alignItems: 'center', marginTop: 5 },
  primaryButtonText: { color: C.white, fontWeight: '800', fontSize: 14 },
  secondaryButton: { backgroundColor: C.white, borderColor: C.blue, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center' },
  secondaryButtonText: { color: C.blue, fontWeight: '800', fontSize: 14 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 8 },
  error: { color: C.red, fontSize: 12, lineHeight: 18, marginTop: -7 },
  feedback: { color: C.green, fontSize: 13, lineHeight: 19 },
  status: { fontWeight: '700', fontSize: 13 },
  note: { color: C.muted, fontSize: 12, lineHeight: 18, paddingHorizontal: 2 },
  preview: { width: 140, height: 140, borderRadius: 70, alignSelf: 'center' },
  emptyImage: { minHeight: 90, borderWidth: 1, borderColor: C.line, borderStyle: 'dashed', borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: C.white }
});
