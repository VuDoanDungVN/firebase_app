import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const CategoriesList = [
  { title: "Japan News", link: "#" },
  { title: "Job Support", link: "#" },
  { title: "Cultural Support", link: "#" },
  { title: "Japan News", link: "#" },
  { title: "Japan News", link: "#" },
  { title: "Japan News", link: "#" },
];

const ImageData = [
  { image: require("../../assets/slide/6.jpg") },
  { image: require("../../assets/slide/2.jpg") },
  { image: require("../../assets/slide/3.jpg") },
  { image: require("../../assets/slide/4.jpg") },
  { image: require("../../assets/slide/5.jpg") },
  { image: require("../../assets/slide/6.jpg") },
];

const DataList = [
  {
    image: require("../../assets/slide/6.jpg"),
    title: "Exploring Japan",
    description: "A deep dive into the culture and traditions of Japan.",
    author: "John Doe",
    date: "2023-10-01",
  },
  {
    image: require("../../assets/slide/2.jpg"),
    title: "Job Support in Japan",
    description: "Resources and tips for finding a job in Japan.",
    author: "Jane Smith",
    date: "2023-09-25",
  },
  {
    image: require("../../assets/slide/3.jpg"),
    title: "Cultural Support",
    description: "How to adapt to the cultural differences in Japan.",
    author: "Emily Johnson",
    date: "2023-09-20",
  },
  {
    image: require("../../assets/slide/4.jpg"),
    title: "Japan News",
    description: "Latest news and updates from Japan.",
    author: "Michael Brown",
    date: "2023-09-15",
  },
  {
    image: require("../../assets/slide/5.jpg"),
    title: "Travel Tips",
    description: "Essential travel tips for visiting Japan.",
    author: "Chris Lee",
    date: "2023-09-10",
  },
  {
    image: require("../../assets/slide/6.jpg"),
    title: "Japanese Cuisine",
    description: "A guide to the best Japanese dishes and where to find them.",
    author: "Sarah Wilson",
    date: "2023-09-05",
  },
];

const _renderItem = ({ item }: any) => {
  return (
    <TouchableOpacity>
      <Image source={item.image} style={styles.carouselImage} />
    </TouchableOpacity>
  );
};

const AuthenticatedScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.subHeaderText}>All Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CategoriesList.map((category, index) => (
            <TouchableOpacity>
              <View style={styles.categoryItem} key={index}>
                <Text style={styles.categoryText}>{category.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.subHeaderText}>Recent Activity</Text>
        </View>

        <View style={styles.carouselContainer}>
          <Carousel
            layout={"default"}
            data={ImageData}
            sliderWidth={400}
            itemWidth={380}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={ImageData.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.subHeaderText}>List Event</Text>
          <Text style={styles.showAllText}>Show All</Text>
        </View>

        {DataList.map((dataList, index) => (
          <TouchableOpacity>
            <View style={styles.listContent} key={index}>
              <Image source={dataList.image} style={styles.eventImage} />
              <View style={styles.eventTextContainer}>
                <Text style={styles.eventTitle}>{dataList.title}</Text>
                <Text style={styles.eventDescription}>
                  {dataList.description}
                </Text>
                <View style={styles.eventFooter}>
                  <Text style={styles.eventFooterText}>{dataList.author}</Text>
                  <Text style={styles.eventFooterText}>{dataList.date}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 10,
    marginVertical: 5,
    color: "#444",
  },
  categoryItem: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.05,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  showAllText: {
    fontSize: 16,
    color: "#3498db",
    paddingHorizontal: 10,
  },
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginVertical: 10,
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  paginationContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    marginTop: 10,
    width: 50,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
    marginHorizontal: 4,
  },
  paginationInactiveDot: {
    backgroundColor: "#ccc",
  },
  listContent: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 5,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  eventTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#25272B",
  },
  eventDescription: {
    fontSize: 15,
    color: "#90939D",
    marginVertical: 5,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventFooterText: {
    color: "#456FE8",
    fontWeight: "500",
  },
});

export default AuthenticatedScreen;
